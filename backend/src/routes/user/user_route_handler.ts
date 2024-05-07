import { Request, Response, Router } from "express";
import express from "express";
import { User } from "../../models/user.model";
import { validate_user } from "../../validators/user.validation";

export default function user_route_handler(): Router {
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send("hi");
  });

  router.post("/", validate_user, register_user);

  return router;
}

function register_user(req: Request, res: Response) {
  typeof User;
}
