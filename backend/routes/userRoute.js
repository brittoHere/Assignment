const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  sendOtpVerificationEmail,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/:id/verify/:token").get(sendOtpVerificationEmail);

module.exports = router;
