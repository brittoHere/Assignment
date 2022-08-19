const asyncHandler = require("express-async-handler");
const UserModel = require("../model/user");
const generateToken = require("../utils/generateToken");
const Token = require("../model/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This email already exists");
  }

  const user = await UserModel.create({ email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });

    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);
    res.status(201).send({
      message: "An email send to your account please verify",
    });
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const sendOtpVerificationEmail = asyncHandler(async () => {
  try {
    const otp = `${1000 + Math.random() * 9000}`;
  } catch (error) {}
});

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  sendOtpVerificationEmail,
};
