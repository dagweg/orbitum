import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function tokenRouteHandler() {
  const router = express.Router();
  router.post("/", validateToken);
  return router;
}

function validateToken(req: Request, res: Response) {
  try {
    const token = req.body.token;
    if (!token) {
      res.sendStatus(401);
    }
    jwt.verify(
      token as string,
      process.env.TOKEN_KEY as string,
      (err, decoded) => {
        if (err) {
          res.sendStatus(403);
        }
        res.send(decoded);
      }
    );
    res.send("shouldnt have sent this !");
  } catch (error) {
    console.log((error as Error).message);
    res.send(500).json({ error });
  }
}
