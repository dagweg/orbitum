import express, { Router } from "express";

import { validateSession } from "../../middlewares/validateSession";
import { getAllNotifications } from "../../controllers/notification/getAllNotifications";

export function notificationRouteHandler(): Router {
  const router = express.Router();

  router.use(validateSession);

  router.get("/getAll", getAllNotifications);

  return router;
}
