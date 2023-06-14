import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

// Routes
// Якщо використовуєм модулі то обов'язково дописуєм .js
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express(); // creating application
dotenv.config();

// Constants
const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3210;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Middlevare - функція яка розширяє і доповняє базові налашт експреса
app.use(cors()); // Допоможе приймати запити на серв з різих IP
app.use(fileUpload()); // Завантажувати файли на серв з клієнта
app.use(express.json()); // Приймати JSON з фронта
app.use(express.static('uploads')); // Вказуємо папку куди завантажувати файли

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@mern04.ergg0eu.mongodb.net/${DB_NAME}`
    );

    //start the server
    app.listen(PORT, () => {
      // port, function
      console.log(`Server listening: ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
