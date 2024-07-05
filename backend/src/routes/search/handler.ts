// const express = require("express");
import express from "express";
import { SearchSchema } from "../../validators/search.validation";
import { searchChatSidebar } from "./searchChatSidebar";
import { validateSession } from "../../middlewares/validateSession";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";

export function searchHandler() {
  const router = express.Router();
  router.use(validateSession);
  router.get(
    "/chat/sidebar",
    validateGETRequestSchema(SearchSchema),
    searchChatSidebar
  );

  return router;
}
