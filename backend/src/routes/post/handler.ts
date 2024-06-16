import { Router } from "express";
const express = require("express");
import { createPost } from "./createPost";
import { PostSchema } from "../../validators/post.validation";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import { validateSession } from "../../middlewares/validateSession";
import { getAllPosts } from "./getAllPosts";
import { getAllUserPosts } from "../../controllers/user/getAllUserPosts";
import { likeSchema } from "../../validators/like.validation";
import { likePost } from "./likePost";

export default function postsRouterHandler(): Router {
  const router = express.Router();

  router.use(validateSession);

  /** RETURNS THE POSTS OF ALL THE USERS */
  router.get("/", getAllPosts);

  /** Like a post */
  router.post("/like", validatePOSTRequestSchema(likeSchema), likePost);

  /**USER POST FUNCTIONALITY */
  router.post(
    "/",
    validateSession,
    validatePOSTRequestSchema(PostSchema),
    createPost
  );

  return router;
}
