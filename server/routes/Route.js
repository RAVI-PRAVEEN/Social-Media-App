import express from "express";
import { login, register } from "../controllers/Auth.js";
import { createPost } from "../controllers/createPost.js";
import {
  fetchAllPosts,
  fetchAllStories,
  fetchUserImg,
  fetchUserName,
} from "../controllers/Posts.js";

const router = express.Router();

// AUTH ROUTES
router.post("/register", register);
router.post("/login", login);

// POST ROUTES
router.post("/posts", createPost);
router.get("/posts", fetchAllPosts);

// USER ROUTES
router.get("/user/name", fetchUserName);
router.get("/user/image", fetchUserImg);

// STORIES ROUTES
router.get("/stories", fetchAllStories);

export default router;
