import { Router } from "express";
const express = require("express");
import { validateSession } from "../../middlewares/validateSession";
import { getPrivateChats } from "./getPrivateChats";
import { getPrivateChat } from "./getPrivateChat";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";
import {
  GetPrivateChatSchema,
  ViewMessageSchema,
} from "../../validators/chat.validation";
import { getAllChats } from "./getAllChat";
import { validatePOSTRequestSchema } from "../../middlewares/validatePOSTRequestSchema";
import { viewMessage } from "../../controllers/chat/viewMessage";

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

  return router;
}
