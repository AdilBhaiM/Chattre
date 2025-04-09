import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {

  const { email, password, fullName } = req.body;

  if (!email || !fullName || !password)
    return res
      .status(400)
      .json({ message: "Please fill out all details required" });
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 letters" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User Already Exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      fullName,
      // profilePic,
      password: hashedPass,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        // profilePic: newUser.profilePic
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signing up controller : " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please fill out all details required" });
  try {
    const logUser = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, logUser.password);
    if (!logUser)
      return res.status(400).json({ message: "User Doesn't Exist" });
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Please enter a correct password" });
    generateToken(logUser._id, res);
    res.status(200).json({
      _id: logUser._id,
      email: logUser.email,
      fullName: logUser.fullName,
      profilePic: logUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signing in controller : " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.log("Error in signing out controller : " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Please Upload an image" });
    if (!fullName)
      return res.status(400).json({ message: "Please Provide a Full Name" });
    const userId = req.user._id;
    // const user = await User.findById(userId);
    const uploadedImage = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadedImage.secure_url, fullName: fullName },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile picture : " + error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // const existedUser = req.user
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in CheckAuth : " + error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
};
