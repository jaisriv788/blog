"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpdateSchema = exports.postSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .email({ message: "Enter a valid email" })
        .trim()
        .toLowerCase(),
    name: zod_1.default.string().toUpperCase().trim().optional(),
    password: zod_1.default
        .string()
        .trim()
        .min(8, { message: "Minimum Password Length : 8" }),
});
exports.signinSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .email({ message: "Enter a valid email" })
        .trim()
        .toLowerCase(),
    password: zod_1.default
        .string()
        .trim()
        .min(8, { message: "Minimum Password Length : 8" }),
});
exports.postSchema = zod_1.default.object({
    title: zod_1.default.string().trim().min(1, { message: "Enter something in title" }),
    content: zod_1.default.string().trim().min(1, { message: "Enter something in content" }),
    published: zod_1.default.boolean(),
});
exports.postUpdateSchema = zod_1.default.object({
    id: zod_1.default.string().min(1, { message: "Id can not be empty" }),
    title: zod_1.default
        .string()
        .trim()
        .min(1, { message: "Enter something in title" })
        .optional(),
    content: zod_1.default
        .string()
        .trim()
        .min(1, { message: "Enter something in content" })
        .optional(),
    published: zod_1.default.boolean().optional(),
});
