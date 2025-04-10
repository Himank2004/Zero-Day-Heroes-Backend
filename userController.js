import { User } from "../models/userschema.js"
import jwt from "jsonwebtoken"
import { Post } from "../models/postschema.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Notification } from "../models/notificationschema.js";
import { populate } from "dotenv";
import { Message } from "../models/messageSchema.js";
//saving profile intro

const Intro = async (req, res) => {
    try {
        const userId = req.user?._id; 
        const introData = req.body; 
        const user = await User.findById(userId);
        if (!user)return res.status(404).json({ message: "User not found" });
        user.name = introData.name;
        user.intro = {...user.intro, ...introData};
        await user.save();
        res.status(200).json({ message: "Intro updated successfully", intro: user.intro });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating intro" });
    }
};