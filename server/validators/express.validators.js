import { body, query } from "express-validator";
import validator from "validator";
import ApiError from "../utils/error.handler.js";
import { perfumeConcentrationEnums } from "../constants.js";


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userRegistationValidator = () => {
      return [
            body("name")
                  .notEmpty()
                  .withMessage("Name is required")
                  .isLength({ min: 2 })
                  .withMessage("Name must be at least 2 characters long")
                  .trim()
                  .toLowerCase()
                  .escape(),

            body("email")
                  .notEmpty()
                  .withMessage("Email is required")
                  .isEmail()
                  .withMessage("Please provide a valid email address")
                  .trim()
                  .escape()
                  .toLowerCase()
                  .normalizeEmail(),

            body("phone")
                  .notEmpty()
                  .withMessage("Phone number is required")
                  .isMobilePhone("en-IN")
                  .withMessage("Please provide a valid phone number")
                  .trim()
                  .escape(),

            body("password")
                  .notEmpty()
                  .withMessage("Password is required")
                  .isLength({ min: 6 })
                  .withMessage("Password must be at least 6 characters long")
                  .trim()
                  .escape()
      ]
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userLoginValidator = () => {
      return [
            body("identifier")
                  .notEmpty()
                  .withMessage("Email or phone number is required")
                  .trim()
                  .custom((value) => {
                        const isEmail = validator.isEmail(value);
                        const isPhone = /^(?:\+91)?[6-9]\d{9}$/.test(value);

                        if (!isEmail && !isPhone) {
                              throw new Error("Invalid credential");
                        }

                        return true;
                  }),

            body("password")
                  .notEmpty()
                  .withMessage("Password is required")
                  .trim()
                  .matches(/^[A-Za-z0-9@]{6,8}$/)
                  .withMessage("Invalid credential")
      ]
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userEmailValidator = () => {
      return [
            body("email")
                  .notEmpty()
                  .withMessage("Email is required")
                  .isEmail()
                  .withMessage("Invalid email")
                  .trim()
                  .escape()
                  .toLowerCase()
                  .normalizeEmail(),
      ]
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userResetPasswordValidator = () => {
      return [
            body("newPassword")
                  .notEmpty()
                  .withMessage("Password is required")
                  .trim()
                  .isLength({ min: 6 })
                  .withMessage("Password must be at least 6 characters long"),

            body("confirmPassword")
                  .notEmpty()
                  .withMessage("Confirm password is required")
                  .trim()
                  .custom((value, { req }) => value === req.body.newPassword)
                  .withMessage("Passwords do not match")
      ];
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const userChangePasswordValidator = () => {
      return [
            body("currentPassword")
                  .notEmpty()
                  .withMessage("Current password is required")
                  .trim()
                  .isLength({ min: 6 })
                  .withMessage("Password must be at least 6 characters long"),

            body("newPassword")
                  .notEmpty()
                  .withMessage("New password is required")
                  .trim()
                  .isLength({ min: 6 })
                  .withMessage("Password must be at least 6 characters long"),

            body("confirmPassword")
                  .notEmpty()
                  .withMessage("Confirm password is required.")
                  .trim()
                  .custom((value, { req }) => value === req.body.newPassword)
                  .withMessage("Password do not match")
      ]
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const productValidation = () => {
      return [

            body("brand")
                  .trim()
                  .notEmpty()
                  .withMessage("Brand is required")
                  .matches(/^[a-zA-Z0-9\s&,.'-]+$/)
                  .withMessage("Brand contains invalid characters"),

            body("name")
                  .trim()
                  .notEmpty()
                  .withMessage("Perfume name is required")
                  .matches(/^[a-zA-Z0-9\s&,.'()-]+$/)
                  .withMessage("Perfume name contains invalid characters"),

            body("concentration")
                  .trim()
                  .toLowerCase()
                  .isIn(perfumeConcentrationEnums)
                  .withMessage("Invalid perfume concentration"),

            body("gender")
                  .trim()
                  .notEmpty()
                  .withMessage("Gender is required")
                  .isIn(["male", "female", "unisex"])
                  .withMessage("Invalid gender"),

            body("price")
                  .notEmpty()
                  .withMessage("Price is required")
                  .isFloat({ min: 0 })
                  .withMessage("Price must be a valid positive number"),

            body("oldPrice")
                  .notEmpty()
                  .withMessage("Old price is required")
                  .isFloat({ min: 0 })
                  .withMessage("Old price must be a valid positive number"),

            body("discount")
                  .notEmpty()
                  .withMessage("Discount is required")
                  .isFloat({ min: 0, max: 100 })
                  .withMessage("Discount must be between 0 and 100"),

            body("size")
                  .trim()
                  .notEmpty()
                  .withMessage("Size is required")
                  .matches(/^\d+\s?(ml|ML)$/)
                  .withMessage("Size must be like 50ml, 100ml, 125ml"),

            body("category")
                  .trim()
                  .notEmpty()
                  .withMessage("Category is required")
                  .matches(/^[a-zA-Z\s,&-]+$/)
                  .withMessage("Category contains invalid characters"),

            body("notes.top")
                  .trim()
                  .notEmpty()
                  .withMessage("Top note is required")
                  .matches(/^[a-zA-Z\s,&-]+$/)
                  .withMessage("Top note contains invalid characters"),

            body("notes.heart")
                  .trim()
                  .notEmpty()
                  .withMessage("Heart note is required")
                  .matches(/^[a-zA-Z\s,&-]+$/)
                  .withMessage("Heart note contains invalid characters"),

            body("notes.base")
                  .trim()
                  .notEmpty()
                  .withMessage("Base note is required")
                  .matches(/^[a-zA-Z\s,&-]+$/)
                  .withMessage("Base note contains invalid characters"),

            body("inStock")
                  .notEmpty()
                  .withMessage("Stock quantity is required")
                  .isInt({ min: 0 })
                  .withMessage("Stock quantity cannot be negative"),
      ];
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const brandValidation = () => {
      return [

            body("name")
                  .trim()
                  .notEmpty()
                  .withMessage("Brand name is required")
                  .matches(/^[a-zA-Z0-9\s&.'-]+$/)
                  .withMessage("Brand name contains invalid characters"),

            body("slug")
                  .trim()
                  .notEmpty()
                  .withMessage("Slug is required")
                  .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                  .withMessage(
                        "Slug can only contain lowercase letters, numbers, and hyphens"
                  ),

            body("logo.url")
                  .trim()
                  .notEmpty()
                  .withMessage("Logo URL is required")
                  .isURL()
                  .withMessage("Invalid logo URL"),

            body("logo.public_id")
                  .trim()
                  .notEmpty()
                  .withMessage("Logo public id is required"),

            body("country")
                  .optional()
                  .trim()
                  .isLength({ min: 2, max: 100 })
                  .withMessage("Country must be between 2 and 100 characters"),

      ];
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const fetchingQueryValidation = () => {
      return [
            // Pagination
            query("page")
                  .optional()
                  .isInt({ min: 1 })
                  .withMessage("Page must be a number greater than 0")
                  .toInt(),

            query("limit")
                  .optional()
                  .isInt({ min: 1, max: 50 })
                  .withMessage("Limit must be between 1 and 50")
                  .toInt(),

            // Filters
            query("brand")
                  .optional()
                  .isString()
                  .trim()
                  .isLength({ min: 1 })
                  .withMessage("Brand must be a valid string"),

            query("name")
                  .optional()
                  .isString()
                  .trim()
                  .isLength({ min: 1 })
                  .withMessage("Name must be a valid string"),

            query("gender")
                  .optional()
                  .isIn(["male", "female", "unisex"])
                  .withMessage("Gender must be male, female, or unisex"),


            // Price filters
            query("minPrice")
                  .optional()
                  .isFloat({ min: 0 })
                  .withMessage("minPrice must be a positive number")
                  .toFloat(),

            query("maxPrice")
                  .optional()
                  .isFloat({ min: 0 })
                  .withMessage("maxPrice must be a positive number")
                  .toFloat(),

            // Sorting
            query("sort")
                  .optional()
                  .isString()
                  .custom((value) => {
                        const allowedFields = ["price.amount", "createdAt", "name", "brand"]

                        const fields = value.split(",")
                        for (let field of fields) {
                              const cleanField = field.startsWith("-") ? field.substring(1) : field
                              if (!allowedFields.includes(cleanField)) {
                                    throw new Error(`Invalid sort field: ${cleanField}`)
                              }
                        }
                        return true;
                  }),

            // Global search
            query("search")
                  .optional()
                  .isString()
                  .trim()
                  .isLength({ min: 1 })
                  .withMessage("Search must be a valid string"),

      ]
}


const updatedPerfumeDetailsValidation = () => {
      return [

            body("name")
                  .optional()
                  .trim()
                  .notEmpty()
                  .withMessage("Perfume name cannot be empty")
                  .matches(/^[a-zA-Z0-9\s&.',()-]+$/)
                  .withMessage("Perfume name contains invalid characters"),

            body("brand")
                  .optional()
                  .trim()
                  .notEmpty()
                  .withMessage("Brand cannot be empty")
                  .matches(/^[a-zA-Z0-9\s&.',-]+$/)
                  .withMessage("Brand contains invalid characters"),

            body("category")
                  .optional()
                  .trim()
                  .notEmpty()
                  .withMessage("Category cannot be empty"),

            body("price")
                  .optional()
                  .isFloat({ min: 0 })
                  .withMessage("Price must be a positive number"),

            body("oldPrice")
                  .optional()
                  .isFloat({ min: 0 })
                  .withMessage("Old price must be a positive number"),

            body("discount")
                  .optional()
                  .isFloat({ min: 0, max: 100 })
                  .withMessage("Discount must be between 0 and 100"),

            body("size")
                  .optional()
                  .trim()
                  .notEmpty()
                  .withMessage("Size cannot be empty"),

            body("gender")
                  .optional()
                  .isIn(["male", "female", "unisex"])
                  .withMessage("Invalid gender"),

            body("concentration")
                  .trim()
                  .toLowerCase()
                  .isIn(perfumeConcentrationEnums)
                  .withMessage("Invalid perfume concentration"),

            body("inStock")
                  .optional()
                  .isInt({ min: 0 })
                  .withMessage("Stock must be a non-negative integer"),

            body("notes[top]")
                  .optional()
                  .trim()
                  .isString()
                  .withMessage("Top notes must be a string"),

            body("notes[heart]")
                  .optional()
                  .trim()
                  .isString()
                  .withMessage("Heart notes must be a string"),

            body("notes[base]")
                  .optional()
                  .trim()
                  .isString()
                  .withMessage("Base notes must be a string"),

            body("existingImages")
                  .optional()
                  .custom((value) => {
                        try {
                              JSON.parse(value);
                              return true;
                        } catch {
                              throw new Error(
                                    "existingImages must be valid JSON"
                              );
                        }
                  }),

            body("deletedPublicIds")
                  .optional()
                  .custom((value) => {
                        try {
                              JSON.parse(value);
                              return true;
                        } catch {
                              throw new Error(
                                    "deletedPublicIds must be valid JSON"
                              );
                        }
                  }),
      ];
};


const addressValidation = () => {
      return [

            body("name")
                  .notEmpty()
                  .withMessage("Name is required")
                  .isLength({ min: 2 })
                  .withMessage("Name must be at least 2 characters long")
                  .trim()
                  .toLowerCase()
                  .escape(),

            body("phone")
                  .notEmpty()
                  .withMessage("Phone number is required")
                  .isMobilePhone("en-IN")
                  .withMessage("Please provide a valid phone number")
                  .trim()
                  .escape(),

            body("pincode")
                  .trim()
                  .notEmpty()
                  .withMessage("Pincode is required")
                  .matches(/^[0-9]{6}$/)
                  .withMessage("Pincode must be exactly 6 digits"),

            body("address")
                  .trim()
                  .notEmpty()
                  .withMessage("Address is required")
                  .isLength({ min: 5, max: 200 })
                  .withMessage("Address must be between 5 and 200 characters")
                  .matches(/^[a-zA-Z0-9\s,.()\/\\-]+$/)
                  .withMessage("Address contains invalid characters"),

            body("city")
                  .trim()
                  .notEmpty()
                  .withMessage("City is required")
                  .isLength({ min: 2, max: 50 })
                  .withMessage("City must be between 2 and 50 characters")
                  .matches(/^[a-zA-Z\s,-]+$/)
                  .withMessage("City contains invalid characters"),

            body("state")
                  .trim()
                  .notEmpty()
                  .withMessage("State is required")
                  .isLength({ min: 2, max: 50 })
                  .withMessage("State must be between 2 and 50 characters")
                  .matches(/^[a-zA-Z\s,-]+$/)
                  .withMessage("State contains invalid characters"),

            body("country")
                  .trim()
                  .notEmpty()
                  .withMessage("Country is required")
                  .isLength({ min: 2, max: 50 })
                  .withMessage("Country must be between 2 and 50 characters")
                  .matches(/^[a-zA-Z\s,-]+$/)
                  .withMessage("Country contains invalid characters")

      ]
}

export {
      userRegistationValidator,
      userLoginValidator,
      userEmailValidator,
      userResetPasswordValidator,
      userChangePasswordValidator,
      productValidation,
      brandValidation,
      fetchingQueryValidation,
      updatedPerfumeDetailsValidation,
      addressValidation
}