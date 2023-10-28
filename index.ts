import express from "express";
const app = express();
import mongoose from "mongoose";
const port = 3000;
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose
  .connect("mongodb+srv://omi:1234@omi.vqrn8w9.mongodb.net/", {
    dbName: "courses",
  })
  .then((res) => {
    if (res.connections && res.connections.length > 0) {
      console.log("Database connected");
    } else {
      console.log("Database connection failed");
    }
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

export {};
