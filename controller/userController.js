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

const getTotalImpressions = async (req, res) => {
    const userId=req.user?._id;
    try {
        const user = await User.findById(userId).select('posts');
        if (!user || user.posts.length === 0) {
            return res.status(200).json({ userId, totalImpressions: 0 });
        }

     
        const totalImpressions = await Post.aggregate([
            { $match: { _id: { $in: user.posts } } },  
            { $group: { _id: null, totalImpressions: { $sum: "$impression" } } } 
        ]);

        const impressionsCount = totalImpressions[0]?.totalImpressions || 0;
        res.status(200).json({ impressions: impressionsCount });
    } catch (error) {
        console.error("Error calculating total impressions:", error);
        res.status(500).json({ message: "Error calculating total impressions", error });
    }
};

//saving profile Education
const Education = async (req, res) => {
    try {
        const userId = req.user?._id; 
        const { id, education } = req.body; 

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (id === -1) {
            user.educations.unshift(education); 
        } else {
            const index = user.educations.findIndex((item) => item._id.equals(education._id));
            if (index !== -1) {
                user.educations[index] = { ...user.educations[index], ...education }; 
            } else {
                return res.status(404).json({ message: "Education entry not found" });
            }
        }
        await user.save();
        res.status(200).json({ message: "Education updated successfully", edu: user.educations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating education" });
    }
};
