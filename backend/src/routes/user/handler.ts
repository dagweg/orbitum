import { Router } from "express";
import express from "express";
import { loginUser } from "./login";
import { validateLoginCredentials } from "../../middlewares/validateLoginCredentials";
import { logoutUser } from "./logout";
import { validateUserLoggedIn } from "../../middlewares/validateUserLoggedIn";
import { validateRegistrationCredentials } from "../../middlewares/validateRegistrationCredentials";
import { registerUser } from "./register";

export default function userRouteHandler(): Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("hi");
  });

  /**REGISTRATION */
  router.post("/", validateRegistrationCredentials, registerUser);

  /**LOGIN */
  router.post("/login", validateLoginCredentials, loginUser);

  /**LOGOUT*/
  router.post("/logout", logoutUser);

  /**LOGGED IN CHECKER */
  router.post("/isLoggedIn", validateUserLoggedIn, (req, res) => {
    return res.json({ message: "YOU ARE LOGGED IN" });
  });

  return router;
}
