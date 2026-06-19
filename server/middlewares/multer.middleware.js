import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { ImageExtensions, ImageMimeTypes } from "../constants.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const tempDirPath = path.resolve("server/temp");

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
      destination: async (req, file, cb) => {
            try {
                  await fs.promises.mkdir(tempDirPath, {
                        recursive: true,
                  });

                  cb(null, tempDirPath);
            } catch (error) {
                  cb(error);
            }
      },

      filename: (req, file, cb) => {
            try {
                  const uid = uuid();
                  const suffix = `lessence-${Date.now()}`;
                  const ext = path.extname(file.originalname).toLowerCase();

                  cb(
                        null,
                        `${file.fieldname}-${uid}-${suffix}${ext}`
                  );
            } catch (error) {
                  cb(error);
            }
      },
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const fileFilter = (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();

      const isValidExtension = ImageExtensions.includes(ext);
      const isValidMimeType = ImageMimeTypes.includes(file.mimetype);

      if (!isValidExtension || !isValidMimeType) {
            return cb(
                  new Error(
                        "Invalid file type. Only image files are allowed."
                  ),
                  false
            );
      }

      cb(null, true);
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const upload = multer({
      storage,
      fileFilter,
      limits: {
            fileSize: 10 * 1024 * 1024, // 10 MB
      },
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

export default upload;