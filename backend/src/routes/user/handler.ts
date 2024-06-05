import { Request, Response, Router } from "express";
const express = require("express");
import { loginUser } from "./login";
import { logoutUser } from "./logout";
import { registerUser } from "./register";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import {
  GetUserSchema,
  UserSchemaRefined,
} from "../../validators/user.validation";
import { LoginSchema } from "../../validators/login.validation";
import { validateSession } from "../../middlewares/validateSession";
import { PostSchema } from "../../validators/post.validation";
import { createPost } from "./createPost";
import { getAllUserPosts } from "./getAllUserPosts";
import { checkLoginStatus } from "../../middlewares/checkLoginStatus";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";
import { getUser } from "./getUser";
import { getUserWithId } from "./getUserWithId";

export default function userRouteHandler(): Router {
  const router = express.Router();

  router.get("/", validateSession, getUser);

  router.get(
    "/withId",
    validateSession,
    validateGETRequestSchema(GetUserSchema),
    getUserWithId
  );

  /**REGISTRATION */
  router.post("/", validatePOSTRequestSchema(UserSchemaRefined), registerUser);

  /**LOGIN */
  router.post("/login", validatePOSTRequestSchema(LoginSchema), loginUser);

  /**LOGOUT*/
  router.post("/logout", logoutUser);

  /**Check if User logged in */
  router.get("/status", checkLoginStatus, (req: Request, res: Response) => {
    res.status(200).json({ loggedIn: true });
  });

  /**USER POST FUNCTIONALITY */
  router.post(
    "/post",
    validateSession,
    validatePOSTRequestSchema(PostSchema),
    createPost
  );

  /** GET ALL POSTS THE USER HAS POSTED TILL NOW */
  router.get("/post", validateSession, getAllUserPosts);

  return router;
}
