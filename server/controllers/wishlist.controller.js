import mongoose from "mongoose";
import Wishlist from "../models/wishlist.model.js";
import Perfume from "../models/perfume.model.js";
import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/error.handler.js";
import ApiResponse from "../utils/response.handler.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const addPerfumeToWishlist = asyncHandler(async (req, res) => {
      let { perfumeID } = req.params;

      if (!perfumeID) {
            throw new ApiError(400, "Perfume ID is required");
      }
      perfumeID = perfumeID.trim();

      if (!mongoose.Types.ObjectId.isValid(perfumeID)) {
            throw new ApiError(400, "Invalid perfume ID");
      }

      let perfume = await Perfume.findById(perfumeID);

      if (!perfume) {
            throw new ApiError(404, "Perfume not found");
      }

      let userID = req.user._id;
      let wishlist = await Wishlist.findOneAndUpdate(
            { user: userID },
            { $addToSet: { list: perfumeID } },
            { returnDocument: "after", upsert: true }
      ).populate("list user")

      if (!wishlist) {
            throw new ApiError(500, "Failed to add perfume to wishlist");
      }

      res.status(200).json(new ApiResponse(200, "Perfume added to wishlist", wishlist));
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const removePerfumeFromWishlist = asyncHandler(async (req, res) => {
      let { perfumeID } = req.params;

      if (!perfumeID) {
            throw new ApiError(400, "Perfume ID is required");
      }
      perfumeID = perfumeID.trim();

      if (!mongoose.Types.ObjectId.isValid(perfumeID)) {
            throw new ApiError(400, "Invalid perfume ID");
      }

      const perfume = await Perfume.findById(perfumeID);

      if (!perfume) {
            throw new ApiError(404, "Perfume not found");
      }

      const userID = req.user._id;
      const wishlist = await Wishlist.findOneAndUpdate(
            { user: userID },
            { $pull: { list: perfumeID } },
            { returnDocument: "after" }
      ).populate("list user")

      if (!wishlist) {
            throw new ApiError(500, "Failed to remove perfume from wishlist");
      }



      res.status(200).json(new ApiResponse(200, "Perfume removed from wishlist", wishlist));
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchWishlist = asyncHandler(async (req, res) => {
      const userID = req.user._id;
      const wishlist = await Wishlist.findOne({ user: userID }).populate("list user");

      if (!wishlist) {
            throw new ApiError(404, "Wishlist not found");
      }

      res.status(200).json(new ApiResponse(200, "Wishlist fetched successfully", wishlist));
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const clearWishlist = asyncHandler(async (req, res) => {
      let userID = req.user._id;

      let wishlist = await Wishlist.findOneAndUpdate(
            { user: userID },
            { $set: { list: [] } },
            { returnDocument: "after" }
      ).populate("list user")

      if (!wishlist) {
            throw new ApiError(500, "Failed to clear wishlist");
      }

      res.status(200).json(new ApiResponse(200, "Wishlist cleared successfully", wishlist));
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export {
      addPerfumeToWishlist,
      removePerfumeFromWishlist,
      fetchWishlist,
      clearWishlist
}