import express from "express";
import { Mongo } from "./core/db";

Mongo.get().connect();

const app = express();

app.get("/", (_req, res) => {
  res.send("Welcome to Matsher!");
});

app.listen(process.env.PORT, () => console.log("matsher api is up and running!"));
