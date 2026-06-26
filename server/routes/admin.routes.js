import express from "express";
import upload from "../middlewares/multer.middleware.js";
import { authorizeRole, verifyToken } from "../middlewares/auth.middleware.js";
import { fetchingQueryValidation, productValidation, updatedPerfumeDetailsValidation } from "../validators/express.validators.js";
import { validationEngine } from "../middlewares/validator.middleware.js";
import { parseFormData } from "../middlewares/parsedFromdata.middleware.js";
import { fetchCurrentPerfume, fetchPerfumes } from "../controllers/user.controller.js";
import {
      registerPerfume,
      getAllUsers,
      updatePerfume,
      removePerfume,
      fetchAdminDashboard
} from "../controllers/admin.controller.js";


const adminRouter = express.Router()


adminRouter.post("/perfumes",
      verifyToken,
      authorizeRole("admin"),
      upload.array("images", 5),
      parseFormData,
      productValidation(),
      validationEngine,
      registerPerfume
)


adminRouter.get("/perfumes",
      verifyToken,
      authorizeRole("admin"),
      fetchingQueryValidation(),
      validationEngine,
      fetchPerfumes
)


adminRouter.get("/perfumes/:perfumeID",
      verifyToken,
      authorizeRole("admin"),
      fetchCurrentPerfume
)


adminRouter.get("/users",
      verifyToken,
      authorizeRole("admin"),
      getAllUsers
)


adminRouter.patch("/perfumes/:perfumeID",
      verifyToken,
      authorizeRole("admin"),
      upload.array("images", 5),
      parseFormData,
      updatedPerfumeDetailsValidation(),
      validationEngine,
      updatePerfume
)


adminRouter.delete('/perfumes/:perfumeID',
      verifyToken,
      authorizeRole("admin"),
      removePerfume
)


adminRouter.get('/dashboard',
      verifyToken,
      authorizeRole("admin"),
      fetchAdminDashboard
)



export default adminRouter