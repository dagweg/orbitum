import { Router } from "express";
import express from "express";
import { createPost } from "../user/createPost";
import { PostSchema } from "../../validators/post.validation";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import { validateSession } from "../../middlewares/validateSession";
import { getAllPosts } from "./getAllPosts";
import { getAllUserPosts } from "../user/getAllUserPosts";
import { likeSchema } from "../../validators/like.validation";
import { likePost } from "./likePost";

export default function postsRouterHandler(): Router {
  const router = express.Router();

  router.use(validateSession);

  /** RETURNS THE POSTS OF ALL THE USERS */
  router.get("/", getAllPosts);

  /** Like a post */
  router.post("/like", validatePOSTRequestSchema(likeSchema), likePost);

  return router;
}
