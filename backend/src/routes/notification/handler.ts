import { Request, Response, Router } from "express";
import express from "express";
import { validateSession } from "../../middlewares/validateSession";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";
import { z } from "zod";
import { getAllNotifications } from "../../controllers/notification/getAllNotifications";

export function notificationRouteHandler(): Router {
  const router = express.Router();

  router.use(validateSession);

  router.get("/getAll", getAllNotifications);

  return router;
}
