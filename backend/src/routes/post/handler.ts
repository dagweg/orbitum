import { Router } from "express";
import express from "express";
import { createPost } from "./createPost";
import { PostSchema } from "../../validators/post.validation";
import { validateRequestSchema } from "../../middlewares/validateRequestSchema";
import { validateSession } from "../../middlewares/validateSession";
import { getAllPosts } from "./getAllPosts";
import { getAllUserPosts } from "../user/getAllUserPosts";

export default function postRouteHandler(): Router {
  const router = express.Router();

  /** RETURNS THE POSTS OF ALL THE USERS */
  router.get("/", validateSession, getAllPosts);

  return router;
}
