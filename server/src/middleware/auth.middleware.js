import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // console.log(req.cookies.jwt);
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(401)
        .json({ message: "UNauthorized - No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User Not Fond" });

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in ProtectRoute MiddleWare : " + error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
};
