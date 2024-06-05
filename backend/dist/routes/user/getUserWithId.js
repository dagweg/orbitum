"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithId = void 0;
const user_model_1 = require("../../models/user.model");
async function getUserWithId(req, res) {
    try {
        const { userId } = req.query;
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ message: "Couldn't find user with that id." });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.getUserWithId = getUserWithId;
