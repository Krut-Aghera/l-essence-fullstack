import Perfume from "../models/perfume.model.js";
import asyncHandler from "../utils/async.handler.js";
import ApiResponse from "../utils/response.handler.js";

const fetchFilterMetadata = asyncHandler(async (req, res) => {
    const meta = await Perfume.aggregate([
        {
            $facet: {
                brands: [
                    { $match: { brand: { $ne: null } } },
                    { $group: { _id: "$brand" } },
                    { $sort: { _id: 1 } },
                ],
                priceBounds: [
                    { $match: { price: { $ne: null } } },
                    {
                        $group: {
                            _id: null,
                            minPrice: { $min: "$pricet" },
                            maxPrice: { $max: "$price" },
                        },
                    },
                ],
            },
        },
    ]);

    const brands = meta[0]?.brands.map((b) => b._id) || [];
    const minPrice = meta[0]?.priceBounds[0]?.minPrice ?? 0;
    const maxPrice = meta[0]?.priceBounds[0]?.maxPrice ?? 500;

    res.status(200).json(
        new ApiResponse(200, "Filter metadata fetched successfully", {
            brands,
            priceBounds: { min: minPrice, max: maxPrice },
        })
    );
});

export { fetchFilterMetadata };
