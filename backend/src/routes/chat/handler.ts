import { Router } from "express";
import express from "express";
import { validateSession } from "../../middlewares/validateSession";
import { getPrivateChats } from "./getPrivateChats";
import { getPrivateChat } from "./getPrivateChat";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";
import { GetPrivateChatSchema } from "../../validators/chat.validation";

export default function chatRouteHandler(): Router {
  const router = express.Router();

  router.get("/private", validateSession, getPrivateChats);
  router.get(
    "/private/user",
    validateSession,
    validateGETRequestSchema(GetPrivateChatSchema),
    getPrivateChat
  );

  return router;
}
