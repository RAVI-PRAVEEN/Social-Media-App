import Post from "../models/Post.js";
import User from "../models/Users.js";

export const createPost = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userPic,
      fileType,
      file,
      description,
      location,
    } = req.body;

    // Create new post
    const newPost = new Post({
      userId,
      userName,
      userPic,
      fileType,
      file,
      description,
      location,
    });

    const post = await newPost.save();

    // Add post reference to user
    await User.findByIdAndUpdate(userId, {
      $push: { posts: post._id },
    });

    res.status(201).json({
      msg: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
