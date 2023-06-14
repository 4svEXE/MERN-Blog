import { Router } from "express";
import { createPost } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";
const router = new Router();

// Create a post
// http://localhost:5100/api/posts
router.post("/", checkAuth, createPost);

export default router;
