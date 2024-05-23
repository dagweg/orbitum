import { Router } from "express";
import express from "express";
import { validateLoginCredentials } from "../../middlewares/validateLoginCredentials";
import { validateUserLoggedIn } from "../../middlewares/validateUserLoggedIn";
import { validateRegistrationCredentials } from "../../middlewares/validateRegistrationCredentials";
import { validatePostRequest } from "../../middlewares/validatePostRequest";
import { createPost } from "./createPost";
import { validateSession } from "../session/validate";
import { PostSchema } from "../../validators/post.validation";
import { validateRequestSchema } from "../../middlewares/validateRequestSchema";

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
