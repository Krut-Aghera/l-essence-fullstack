import express from "express";
import { authorizeRole, verifyToken } from "../middlewares/auth.middleware.js";
import { validationEngine } from "../middlewares/validator.middleware.js"
import { fetchCurrentPerfume, fetchPerfumes, fetchBrands, addAddress, updateAddress, removeAddress, fetchAddresses, updateUserDetail } from "../controllers/user.controller.js";
import { addressValidation } from "../validators/express.validators.js";



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userRouter = express.Router();


// fetch perfume brands
userRouter.get("/perfumes/brands",
      fetchBrands
)


// fetch perfumes
userRouter.get("/perfumes",
      fetchPerfumes
)


// fetch specific perfume by its id
userRouter.get("/perfumes/:perfumeID",
      fetchCurrentPerfume
)


// update user detail
userRouter.patch(
      "/:userID",
      verifyToken,
      authorizeRole("customer", "admin"),
      updateUserDetail
)


// fetch addresses
userRouter.get(
      "/address",
      verifyToken,
      authorizeRole("customer", "admin"),
      fetchAddresses
);


// add address
userRouter.post(
      "/address",
      verifyToken,
      authorizeRole("customer", "admin"),
      addressValidation(),
      validationEngine,
      addAddress
);


// update address
userRouter.patch(
      "/address/:addressID",
      verifyToken,
      authorizeRole("customer", "admin"),
      addressValidation(),
      validationEngine,
      updateAddress
);


// remove address
userRouter.delete(
      "/address/:addressID",
      verifyToken,
      authorizeRole("customer", "admin"),
      removeAddress
);



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export default userRouter;