import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import { User } from "../../models/user.model";
import { validateCredentials } from "../../validators/user.validation";

export default function userRouteHandler(): Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("hi");
  });

  router.post("/", validateCredentials, registerUser);

  return router;
}

export function registerUser(req: Request, res: Response) {
  res.send("you have been registered successfully");
}
