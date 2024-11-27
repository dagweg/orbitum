import express, { Router } from "express";

import { validateSession } from "../../middlewares/validateSession";

export default function userRouteHandler(): Router {
  const router = express.Router();

  // Session Validation
  router.post("/validate", validateSession);

  return router;
}
