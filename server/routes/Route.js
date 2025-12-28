import express from "express";
import { login, register } from "../controllers/Auth.js";
import { createPost } from "../controllers/createPost.js";
import {
  fetchAllPosts,
  fetchAllStories,
  fetchUserImg,
  fetchUserName,
} from "../controllers/Posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// AUTH ROUTES (Public)
router.post("/register", register);
router.post("/login", login);

// POST ROUTES (Protected)
router.post("/posts", verifyToken, createPost);
router.get("/posts", verifyToken, fetchAllPosts);

// USER ROUTES (Protected)
router.get("/user/name", verifyToken, fetchUserName);
router.get("/user/image", verifyToken, fetchUserImg);

// STORIES ROUTES (Protected)
router.get("/stories", verifyToken, fetchAllStories);

export default router;
