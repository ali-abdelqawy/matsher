import "reflect-metadata";
import "./core/globals";
import path from "path";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { Mongo } from "./core/utils";
import cookieParser from "cookie-parser";

Mongo.get().connect();

let app = express();

app.use(cookieParser());

app = useExpressServer(app, {
  routePrefix: "/api",
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
  },
  defaultErrorHandler: false,
  middlewares: [path.join(`${__dirname}/**/global/*.middleware.{js,ts}`)],
  controllers: [path.join(`${__dirname}/**/*.controller.{js,ts}`)],
});

app
  .listen(process.env.PORT, () => console.log("matsher api is up and running!"))
  .setTimeout(Number(process.env.SERVER_TIMEOUT_IN_MS));
