import { Router } from "express";
import express from "express";
import { validateLoginCredentials } from "../../middlewares/validateLoginCredentials";
import { validateUserLoggedIn } from "../../middlewares/validateUserLoggedIn";
import { validateRegistrationCredentials } from "../../middlewares/validateRegistrationCredentials";
import { validatePostRequest } from "../../middlewares/validatePostRequest";
import { createPost } from "./createPost";

export default function postRouteHandler(): Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("hi");
  });

  router.post("/", validatePostRequest, createPost);

  return router;
}
