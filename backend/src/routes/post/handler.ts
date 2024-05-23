import { Router } from "express";
import express from "express";
import { createPost } from "./createPost";
import { PostSchema } from "../../validators/post.validation";
import { validateRequestSchema } from "../../middlewares/validateRequestSchema";
import { validateSession } from "../../middlewares/validateSession";

export default function postRouteHandler(): Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("hi");
  });

  router.post(
    "/",
    validateSession,
    validateRequestSchema(PostSchema),
    createPost
  );

  return router;
}
