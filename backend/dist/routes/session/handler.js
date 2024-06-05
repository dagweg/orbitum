"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const validateSession_1 = require("../../middlewares/validateSession");
function userRouteHandler() {
    const router = express.Router();
    // Session Validation
    router.post("/validate", validateSession_1.validateSession);
    return router;
}
exports.default = userRouteHandler;
