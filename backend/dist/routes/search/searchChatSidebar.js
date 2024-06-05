"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchChatSidebar = void 0;
const user_model_1 = require("../../models/user.model");
async function searchChatSidebar(req, res) {
    try {
        const { query } = req.query;
        const { email } = req.user;
        const users = await user_model_1.User.find({
            $and: [
                {
                    $or: [
                        { email: { $regex: query, $options: "i" } },
                        { username: { $regex: query, $options: "i" } },
                        {
                            $or: [
                                {
                                    $or: [
                                        { firstName: { $regex: query, $options: "i" } },
                                        { lastName: { $regex: query, $options: "i" } },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                { email: { $ne: email } },
            ],
        }).select("-password");
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.searchChatSidebar = searchChatSidebar;
