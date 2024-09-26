import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/todoRoute.js";

const app = express();
app.use(bodyParser.json());

const MONGOURL =
  process.env.MONGOURL || "mongodb://localhost:27017/api-noob-todo";
const PORT = process.env.PORT || 3002;

async function connectMongo() {
  try {
    await mongoose.connect(MONGOURL).then(() => {
      app.listen(PORT, () => {
        console.log(`🌟 STARTED! `);
        console.log(`🌟 Server running on port ${PORT}`);
      });
    });
  } catch (err) {
    console.error(err);
  }
}

connectMongo();

app.use("/api", route);
