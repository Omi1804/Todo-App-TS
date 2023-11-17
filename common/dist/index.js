"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetails = void 0;
const zod_1 = require("zod");
exports.UserDetails = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(3).max(20),
});
