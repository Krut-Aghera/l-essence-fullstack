import fs, { read } from "fs";
import ApiError from "../utils/error.handler.js";
import ApiResponse from "../utils/response.handler.js";
import asyncHandler from "../utils/async.handler.js";
import { cloudinaryEngin, destroyCloudinaryAssets } from "../utils/cloudinary.handler.js";
import Perfume from "../models/perfume.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

import { ALLOWED_PERFUME_UPDATE_FIELDS } from "../constants.js";
import Brand from "../models/brand.mode.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const registerPerfume = asyncHandler(async (req, res) => {
    const perfumeDetails = req.body;
    const perfumeLocalFilepath = req.files.map((file) => file.path) || [];

    let uploadedImageIds = [];

    try {
        const result = await cloudinaryEngin(perfumeLocalFilepath);

        uploadedImageIds = result.map((data) => data.public_id);

        const product = {
            ...perfumeDetails,
            images: result,
        };

        const perfume = await Perfume.create(product);

        if (!perfume) {
            throw new ApiError(500, "Database Error while registering new perfume");
        }

        console.log("New perfume entry successful");

        return res
            .status(201)
            .json(new ApiResponse(201, "Perfume registration successful", perfume));
    } catch (error) {
        await destroyCloudinaryAssets(uploadedImageIds);
        console.log(error);

        throw new ApiError(500, error.message);
    } finally {
        await Promise.all(
            perfumeLocalFilepath.map((path) => fs.promises.unlink(path).catch(() => { }))
        );

        console.log("Temp files deleted successfully");
    }
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const getAllUsers = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, sort = "-createdAt", email, name, userID } = req.query;

    const queryFilter = {};

    page = Math.max(Number(page) || 1, 1);
    limit = Math.min(Number(limit) || 20, 30);
    const skip = (page - 1) * limit;

    const sortFix = sort.split(",").join(" ");

    if (email) {
        queryFilter.email = { $regex: email, $options: "i" };
    }
    if (name) {
        queryFilter.name = { $regex: name, $options: "i" };
    }
    if (userID) {
        queryFilter._id = userID;
    }

    const user = await User.find(queryFilter).skip(skip).limit(limit).sort(sortFix);

    if (!user) {
        throw new ApiError(404, "No user found");
    }
    const total = await User.countDocuments(queryFilter);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json(
        new ApiResponse(200, "Users fetched successfully", {
            users: user,
            metadata: {
                totalItems: total,
                currentPage: page,
                totalPages,
                maxItemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        })
    );
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const updatePerfume = asyncHandler(async (req, res) => {
    const { perfumeID } = req.params;

    if (!perfumeID) {
        throw new ApiError(400, "Perfume ID is required");
    }

    let uploadedImageIds = [];

    const perfumeLocalFilepath = req.files?.map((file) => file.path) || [];

    try {
        const perfume = await Perfume.findById(perfumeID);

        if (!perfume) {
            throw new ApiError(404, "Perfume not found");
        }

        const updateData = {};

        for (const field of ALLOWED_PERFUME_UPDATE_FIELDS) {
            if (req.body[field] === undefined) continue;

            if (["price", "oldPrice", "discount", "inStock"].includes(field)) {
                updateData[field] = Number(req.body[field]);
            } else {
                updateData[field] = req.body[field];
            }
        }

        Object.assign(perfume, updateData);

        perfume.notes = {
            top: req.body["notes[top]"] ?? perfume.notes?.top,

            heart: req.body["notes[heart]"] ?? perfume.notes?.heart,

            base: req.body["notes[base]"] ?? perfume.notes?.base,
        };

        const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];

        const deletedPublicIds = req.body.deletedPublicIds
            ? JSON.parse(req.body.deletedPublicIds)
            : [];

        if (deletedPublicIds.length > 0) {
            await destroyCloudinaryAssets(deletedPublicIds);
        }

        let uploadedImages = [];

        if (perfumeLocalFilepath.length > 0) {
            uploadedImages = await cloudinaryEngin(perfumeLocalFilepath);

            uploadedImageIds = uploadedImages.map((image) => image.public_id);
        }

        perfume.images = [...existingImages, ...uploadedImages];

        if (perfume.images.length < 3) {
            throw new ApiError(400, "At least 3 images are required");
        }

        const updatedPerfume = await perfume.save();

        return res
            .status(200)
            .json(new ApiResponse(200, "Perfume updated successfully", updatedPerfume));
    } catch (error) {
        if (uploadedImageIds.length > 0) {
            await destroyCloudinaryAssets(uploadedImageIds);
        }

        throw new ApiError(error.statusCode || 500, error.message);
    } finally {
        await Promise.all(
            perfumeLocalFilepath.map((path) => fs.promises.unlink(path).catch(() => { }))
        );
    }
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const removePerfume = asyncHandler(async (req, res) => {
    const { perfumeID } = req.params;

    if (!perfumeID) {
        throw new ApiError(400, "Perfume ID is required");
    }

    const existingPerfume = await Perfume.findById(perfumeID);

    if (!existingPerfume) {
        throw new ApiError(404, "Perfume not found");
    }

    const perfumeName = `${existingPerfume.brand} ${existingPerfume.name}`;

    const imageIDs = existingPerfume.images.map((image) => image.public_id);

    await destroyCloudinaryAssets(imageIDs);

    await existingPerfume.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, `${perfumeName} has been deleted successfully`));
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchAdminDashboard = asyncHandler(async (req, res) => {
    const [totalPerfumes, totalOrders, totalRevenue, brandStats, recentOrders] = await Promise.all([
        Perfume.countDocuments(),
        Order.countDocuments(),

        Order.aggregate([
            {
                $match: {
                    paymentStatus: "successfull",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice",
                    },
                },
            },
        ]),

        Perfume.aggregate([
            {
                $group: {
                    _id: "$brand",
                    totalPerfumes: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    brand: "$_id",
                    totalPerfumes: 1,
                },
            },
            {
                $sort: {
                    totalPerfumes: -1,
                },
            },
        ]),

        Order.find()
            .populate("user", "name email")
            .select("_id totalPrice paymentStatus orderStatus createdAt user")
            .sort({ createdAt: -1 })
            .limit(5)
            .lean(),
    ]);

    const totalUsers = await User.countDocuments({
        role: { $in: ["customer", "admin"] },
    });

    const dashboardStats = {
        statistics: {
            totalPerfumes,
            totalUsers,
            totalOrders,
            totalBrands: brandStats.length,
            totalRevenue:
                totalRevenue.length > 0 ? Number(totalRevenue[0].totalRevenue.toFixed(2)) : 0,
        },

        brandStats,
        recentOrders,
    };

    return res
        .status(200)
        .json(new ApiResponse(200, "Dashboard statistics fetched successfully", dashboardStats));
});

export { registerPerfume, getAllUsers, updatePerfume, removePerfume, fetchAdminDashboard };
