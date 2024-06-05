"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const login_1 = require("./login");
const logout_1 = require("./logout");
const register_1 = require("./register");
const validatePOSTRequestSchema_1 = require("../../middlewares/validatePOSTRequestSchema");
const user_validation_1 = require("../../validators/user.validation");
const login_validation_1 = require("../../validators/login.validation");
const validateSession_1 = require("../../middlewares/validateSession");
const post_validation_1 = require("../../validators/post.validation");
const createPost_1 = require("./createPost");
const getAllUserPosts_1 = require("./getAllUserPosts");
const checkLoginStatus_1 = require("../../middlewares/checkLoginStatus");
const validateGETRequestSchema_1 = require("../../middlewares/validateGETRequestSchema");
const getUser_1 = require("./getUser");
const getUserWithId_1 = require("./getUserWithId");
function userRouteHandler() {
    const router = express.Router();
    router.get("/", validateSession_1.validateSession, getUser_1.getUser);
    router.get("/withId", validateSession_1.validateSession, (0, validateGETRequestSchema_1.validateGETRequestSchema)(user_validation_1.GetUserSchema), getUserWithId_1.getUserWithId);
    /**REGISTRATION */
    router.post("/", (0, validatePOSTRequestSchema_1.validatePOSTRequestSchema)(user_validation_1.UserSchemaRefined), register_1.registerUser);
    /**LOGIN */
    router.post("/login", (0, validatePOSTRequestSchema_1.validatePOSTRequestSchema)(login_validation_1.LoginSchema), login_1.loginUser);
    /**LOGOUT*/
    router.post("/logout", logout_1.logoutUser);
    /**Check if User logged in */
    router.get("/status", checkLoginStatus_1.checkLoginStatus, (req, res) => {
        res.status(200).json({ loggedIn: true });
    });
    /**USER POST FUNCTIONALITY */
    router.post("/post", validateSession_1.validateSession, (0, validatePOSTRequestSchema_1.validatePOSTRequestSchema)(post_validation_1.PostSchema), createPost_1.createPost);
    /** GET ALL POSTS THE USER HAS POSTED TILL NOW */
    router.get("/post", validateSession_1.validateSession, getAllUserPosts_1.getAllUserPosts);
    return router;
}
exports.default = userRouteHandler;
