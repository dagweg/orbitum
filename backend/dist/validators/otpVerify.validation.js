"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPVerifySchema = void 0;
const zod_1 = require("zod");
exports.OTPVerifySchema = zod_1.z.object({
    inputOtp: zod_1.z.string(),
    token: zod_1.z.string(),
});
