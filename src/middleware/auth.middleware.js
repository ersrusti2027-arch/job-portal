const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { sendError } = require("../utils/response");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, "Not Authorized", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return sendError(res, "Invalid Token", 401);
  }
};

module.exports = protect;
