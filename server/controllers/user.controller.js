
// import User from "../models/user.model.js";
import Perfume from "../models/perfume.model.js"
import Address from "../models/address.model.js";
import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/error.handler.js";
import ApiResponse from "../utils/response.handler.js";


const fetchPerfumes = asyncHandler(async (req, res) => {
      let {
            page = 1,
            limit = 9,
            sort = "-createdAt",
            name,
            brand,
            gender,
            minPrice,
            maxPrice,
            search
      } = req.query

      page = Math.max(Number(page) || 1, 1)
      limit = Math.min(Math.max(Number(limit) || 9, 1), 30)

      const skip = (page - 1) * limit
      const queryFilter = {}

      if (brand) {
            queryFilter.brand = { $regex: brand, $options: "i" }
      }
      if (name) {
            queryFilter.name = { $regex: name, $options: "i" }
      }
      if (gender) {
            queryFilter.gender = gender.toLowerCase()
      }
      if (minPrice || maxPrice) {
            queryFilter["price.amount"] = {};
            if (minPrice) queryFilter["price.amount"].$gte = Number(minPrice);
            if (maxPrice) queryFilter["price.amount"].$lte = Number(maxPrice);
      }

      const sortOptions = sort.split(",").join(" ")

      if (search) {
            queryFilter.$or = [
                  { name: { $regex: search, $options: "i" } },
                  { brand: { $regex: search, $options: "i" } },
                  { gender: { $regex: search, $options: "i" } }
            ]
      }

      const [perfumes, total] = await Promise.all([
            Perfume.find(queryFilter)
                  .sort(sortOptions)
                  .skip(skip)
                  .limit(limit)
                  .select("-gender -createdAt -updatedAt, -notes")
                  .lean(),

            Perfume.countDocuments(queryFilter)
      ])

      const totalPages = Math.ceil(total / limit)

      res.status(200).json(
            new ApiResponse(200, "perfumes fetched successfuly", {
                  perfumes,
                  metadata: {
                        totalItems: total,
                        currentPage: page,
                        totalPages,
                        maxItemsPerPage: limit,
                        hasNextPage: page < totalPages,
                        hasPreviousPage: page > 1
                  }
            })
      )

})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchCurrentPerfume = asyncHandler(async (req, res) => {
      const { perfumeID } = req.params

      if (!perfumeID) {
            throw new ApiError(400, "Perfume ID is required")
      }

      const perfume = await Perfume.findById(perfumeID)

      if (!perfume) {
            throw new ApiError(404, "Perfume not found")
      }

      res.status(200)
            .json(new ApiResponse(200, "Perfume details fetcehd successfully", perfume))
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchBrands = asyncHandler(async (req, res) => {
      const brands = await Perfume.aggregate([
            {
                  $group: {
                        _id: "$brand",
                        perfumeCount: { $sum: 1 },

                        // First perfume's first image URL
                        image: {
                              $first: {
                                    $arrayElemAt: ["$images.url", 0]
                              }
                        }
                  }
            },
            {
                  $project: {
                        _id: 0,
                        brand: "$_id",
                        perfumeCount: 1,
                        image: 1
                  }
            },
            {
                  $sort: {
                        brand: 1
                  }
            }
      ]);

      res.status(200).json(
            new ApiResponse(200, "Brands fetched successfully", brand));
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const addAddress = asyncHandler(async (req, res) => {

      const userID = req.user._id;

      const savedAddress = await Address.findOneAndUpdate(
            { user: userID },
            {
                  $push: {
                        address: req.body
                  }
            },
            {
                  new: true,
                  upsert: true
            }
      );

      res.status(201).json(
            new ApiResponse(201, "Address added successfully", savedAddress)
      );
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchAddresses = asyncHandler(async (req, res) => {

      const addresses = await Address.findOne({
            user: req.user._id
      });

      res.status(200).json(
            new ApiResponse(200, "Addresses fetched successfully", addresses)
      );
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const updateAddress = asyncHandler(async (req, res) => {

      const { addressID } = req.params;

      const document = await Address.findOne({
            user: req.user._id
      });

      if (!document) {
            throw new ApiError(404, "Address not found");
      }

      const address = document.address.id(addressID);

      if (!address) {
            throw new ApiError(404, "Address not found");
      }

      Object.assign(address, req.body);

      await document.save();

      res.status(200).json(
            new ApiResponse(200, "Address updated successfully", document)
      );
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const removeAddress = asyncHandler(async (req, res) => {

      const { addressID } = req.params;

      const updatedAddress = await Address.findOneAndUpdate(
            { user: req.user._id },
            {
                  $pull: {
                        address: {
                              _id: addressID
                        }
                  }
            },
            {
                  new: true
            }
      );

      if (!updatedAddress) {
            throw new ApiError(404, "Address not found");
      }

      res.status(200).json(
            new ApiResponse(200, "Address removed successfully", updatedAddress)
      );
});





//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export {
      fetchPerfumes,
      fetchCurrentPerfume,
      fetchBrands,
      addAddress,
      fetchAddresses,
      updateAddress,
      removeAddress,
}








