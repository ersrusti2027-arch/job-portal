const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");

const sendEmail = require("../services/email.service");

const { sendSuccess, sendError } = require("../utils/response");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return sendError(res, "User Already Exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await sendEmail(
      user.email,
      "Welcome To Job Portal",
      `
      <h2>Hello ${user.name}</h2>

      <p>
        Your account has been created successfully.
      </p>

      <p>
        Thank you for joining Job Portal.
      </p>
      `,
    );

    sendSuccess(res, "Registration Successful", user, 201);
  } catch (error) {
    sendError(res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return sendError(res, "Invalid Credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendError(res, "Invalid Credentials", 400);
    }

    const token = generateToken(user._id);

    sendSuccess(res, "Login Successful", {
      token,
      user,
    });
  } catch (error) {
    sendError(res, error.message);
  }
};
