import { Router } from "express";
import express from "express";
import { loginUser } from "./login";
import { logoutUser } from "./logout";
import { validateUserLoggedIn } from "../../middlewares/validateUserLoggedIn";
import { registerUser } from "./register";
import { validateRequestSchema } from "../../middlewares/validateRequestSchema";
import { UserSchemaRefined } from "../../validators/user.validation";
import { LoginSchema } from "../../validators/login.validation";
import { validateSession } from "../../middlewares/validateSession";
import { PostSchema } from "../../validators/post.validation";
import { createPost } from "../post/createPost";
import { getAllUserPosts } from "./getAllUserPosts";

export default function userRouteHandler(): Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("hi");
  });

  /**REGISTRATION */
  router.post("/", validateRequestSchema(UserSchemaRefined), registerUser);

  /**LOGIN */
  router.post("/login", validateRequestSchema(LoginSchema), loginUser);

  /**LOGOUT*/
  router.post("/logout", logoutUser);

  /**LOGGED IN CHECKER */
  router.post("/isLoggedIn", validateUserLoggedIn, (req, res) => {
    return res.json({ message: "YOU ARE LOGGED IN" });
  });

  /**USER POST FUNCTIONALITY */
  router.post(
    "/post",
    validateSession,
    validateRequestSchema(PostSchema),
    createPost
  );

  /** GET ALL POSTS THE USER HAS POSTED TILL NOW */
  router.get("/post", validateSession, getAllUserPosts);

  return router;
}
