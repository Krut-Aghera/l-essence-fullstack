import fs from "fs";
import ApiError from "./error.handler.js";
import cloudinary from "../config/cloudinary.config.js";


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const cloudinaryEngin = async (localFilepath) => {

      if (!localFilepath || localFilepath.length === 0) return []

      const uploadPromises = localFilepath.map(path =>
            cloudinary.uploader.upload(path, {
                  resource_type: "image",
                  folder: "l'essence"
            })
      )

      const responses = await Promise.all(uploadPromises)

      console.log("Cloudinary upload successful")

      return responses.map(res => ({
            url: res.secure_url,
            public_id: res.public_id
      }))

}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const destroyCloudinaryAssets = async (publicIDs) => {

      if (!publicIDs || publicIDs.length === 0) return []

      const deletePromises = publicIDs.map(id =>
            cloudinary.uploader.destroy(id, {
                  resource_type: "image"
            })
      )

      try {
           
            const response = await Promise.all(deletePromises)
            return response

      } catch (error) {
            throw new ApiError(500, `Cloudinary deletion failed || ${error.message}`)
      }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export {
      cloudinaryEngin,
      destroyCloudinaryAssets
}