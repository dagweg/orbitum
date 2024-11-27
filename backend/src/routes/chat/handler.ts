import express, { Router } from "express";

import { validateSession } from "../../middlewares/validateSession";
import { getPrivateChats } from "./getPrivateChats";
import { getPrivateChat } from "./getPrivateChat";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";
import {
  DeleteChatSchema,
  GetPrivateChatSchema,
  ViewMessageSchema,
} from "../../validators/chat.validation";
import { getAllChats } from "./getAllChat";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import { viewMessage } from "../../controllers/chat/viewMessage";
import { validateDeleteRequestSchema } from "../../middlewares/validateDeleteRequestSchema";

export default function chatRouteHandler(): Router {
  const router = express.Router();

  router.use(validateSession);

  router.get("/private", getPrivateChats);

  router.get(
    "/private/user",
    validateGETRequestSchema(GetPrivateChatSchema),
    getPrivateChat
  );

  router.get("/all", getAllChats);

  /** Handles viewing a message */
  router.post(
    "/viewMessage/",
    validatePOSTRequestSchema(ViewMessageSchema),
    viewMessage
  );

  /// Delete Chat Route
  // router.delete("", validateDeleteRequestSchema(DeleteChatSchema), deleteChat);

  return router;
}
