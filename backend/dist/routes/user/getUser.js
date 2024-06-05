"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const user_model_1 = require("../../models/user.model");
async function getUser(req, res) {
    try {
        let { userId } = req.user;
        let user = await user_model_1.User.findById(userId, "userName email firstName lastName phoneNumber  profileUrl settings");
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
exports.getUser = getUser;
