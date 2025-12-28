import Post from "../models/Post.js";
import Stories from "../models/Stories.js";
import User from "../models/Users.js";

// FETCH ALL POSTS
export const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// FETCH USER NAME
export const fetchUserName = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId).select("username");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// FETCH USER IMAGE
export const fetchUserImg = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId).select("profilePic");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// FETCH ALL STORIES
export const fetchAllStories = async (req, res) => {
  try {
    const stories = await Stories.find().sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
