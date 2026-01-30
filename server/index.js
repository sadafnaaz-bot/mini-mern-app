import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Note from "./models/Note.js";

const app = express();
app.use(cors());
app.use(express.json());

console.log("MONGO_URL =", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"));

app.get("/", (req, res) => {
  res.send("API working");
});

app.post("/notes", async (req, res) => {
  const note = new Note({ text: req.body.text });
  await note.save();
  res.json(note);
});

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
