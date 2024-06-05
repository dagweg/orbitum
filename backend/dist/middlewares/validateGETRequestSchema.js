"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGETRequestSchema = void 0;
// Schema Validation Middleware GET
const validateGETRequestSchema = (schema) => (req, res, next) => {
    try {
        const validation = schema.safeParse(req.query);
        if (!validation.success) {
            return res.status(400).json(validation.error.errors);
        }
        next();
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.validateGETRequestSchema = validateGETRequestSchema;
