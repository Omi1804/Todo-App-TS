"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const todo_1 = __importDefault(require("./routes/todo"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_js_1.default);
app.use("/todo", todo_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default
    .connect("mongodb+srv://omi:1234@omi.vqrn8w9.mongodb.net/", {
    dbName: "courses",
})
    .then((res) => {
    if (res.connections && res.connections.length > 0) {
        console.log("Database connected");
    }
    else {
        console.log("Database connection failed");
    }
})
    .catch((err) => {
    console.error("Error connecting to the database:", err);
});
