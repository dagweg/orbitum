import express, { Router } from "express";
import { validateSession } from "../../middlewares/validateSession";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import { CommentsPostSchema } from "../../validators/comment.validation";
import { postComment } from "./commentPost";

export default function commentRouteHandler(): Router {
  const router = express.Router();

  router.use(validateSession);

  router.post("/", validatePOSTRequestSchema(CommentsPostSchema), postComment);

  return router;
}
