import { Router } from "express";
const express = require("express");
import { validateSession } from "../../middlewares/validateSession";
import { getPrivateChats } from "./getPrivateChats";
import { getPrivateChat } from "./getPrivateChat";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";
import { GetPrivateChatSchema } from "../../validators/chat.validation";
import { getAllChats } from "./getAllChat";

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

  return router;
}
