import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverId, io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({
      _id: {
        $ne: req.user._id,
      },
    }).select("-password");
    res.status(200).json({ allUsers });
  } catch (error) {
    console.log("Error in fetching all users : " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: currChatUserID } = req.params;
    const currUserID = req.user._id;

    const AllMessages = await Message.find({
      $or: [
        { senderID: currChatUserID, receiverID: currUserID },
        { senderID: currUserID, receiverID: currChatUserID },
      ],
    });
    // const AllMessages = await Message.find({User : id});
    
    res.status(201).json({ AllMessages });
  } catch (error) {
    console.log("Error in fetching all messages : " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { image, text } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._id;
    let imageURL;
    if (image) {
      const UploadedImage = await cloudinary.uploader.upload(image);
      imageURL = UploadedImage.secure_url;
    }

    const newMessage = new Message({
      senderID,
      receiverID,
      text,
      image: imageURL,
    });

    await newMessage.save();

    const Id = getReceiverId(receiverID);
    // console.log(Id);
    if (Id) {
      io.to(Id).emit("newMessage", newMessage);
    }

    res.status(201).json({ newMessage });
  } catch (error) {
    console.log("Error in Sending message : " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
