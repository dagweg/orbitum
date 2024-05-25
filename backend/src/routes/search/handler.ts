import express from "express";
import { SearchSchema } from "../../validators/search.validation";
import { searchChatSidebar } from "./searchChatSidebar";
import { validateSession } from "../../middlewares/validateSession";
import { validateGETRequestSchema } from "../../middlewares/validateGETRequestSchema";

export function searchHandler() {
  const router = express.Router();

  router.get(
    "/chat/sidebar",
    validateSession,
    validateGETRequestSchema(SearchSchema),
    searchChatSidebar
  );

  return router;
}
