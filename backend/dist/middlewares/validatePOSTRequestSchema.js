"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePOSTRequestSchema = void 0;
// Schema Validation Middleware POST
const validatePOSTRequestSchema = (schema) => (req, res, next) => {
    try {
        const validation = schema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json(validation.error.errors);
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ error, message: error.message });
    }
};
exports.validatePOSTRequestSchema = validatePOSTRequestSchema;
