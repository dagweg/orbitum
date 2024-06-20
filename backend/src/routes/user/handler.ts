import { Request, Response, Router } from "express";
const express = require("express");
import { loginUser } from "../../controllers/user/login";
import { logoutUser } from "../../controllers/user/logout";
import { registerUser } from "../../controllers/user/register";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import {
  GetUserSchema,
  UserSchemaRefined,
} from "../../validators/user.validation";
import { LoginSchema } from "../../validators/login.validation";
import { validateSession } from "../../middlewares/validateSession";
import { getAllUserPosts } from "../../controllers/user/getAllUserPosts";
import { checkLoginStatus } from "../../middlewares/checkLoginStatus";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";
import { getUser } from "../../controllers/user/getUser";
import { getUserWithId } from "../../controllers/user/getUserWithId";
import { validatePUTRequestSchema } from "../../middlewares/validatePUTRequestSchema";
import { ProfilePicSchema } from "../../validators/settings.validation";
import { changeProfilePicture } from "../../controllers/settings/changeProfilePicture";

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

  /** GET ALL POSTS THE USER HAS POSTED TILL NOW */
  router.get("/post", validateSession, getAllUserPosts);

  /** Updates the profile picture of a user */
  router.put(
    "/settings/profile",
    validateSession,
    validatePUTRequestSchema(ProfilePicSchema),
    changeProfilePicture
  );
  return router;
}
