// internal imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");

// internal imports
const User = require("../../models/People");

// add user
const addUserValidation = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name length must be 2 or above")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("name must not contain anything other then alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already in Use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number already iis use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase,1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult();
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      fs.unlink(
        path.join(__dirname, `/../public/upload/avatar/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidation,
  addUserValidationHandler,
};
