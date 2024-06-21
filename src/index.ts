import "./init";
import cookieParser from "cookie-parser";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { join } from "path";
import { PUBLIC_FOLDER_PATH } from "./core/constants";
import { Db } from "./core/db";
import { Swagger } from "./core/swagger";

const app = useExpressServer(express().use(cookieParser(), express.static(PUBLIC_FOLDER_PATH)), {
  routePrefix: "/api",
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
  },
  defaultErrorHandler: false,
  middlewares: [join(`${__dirname}/**/global/*.middleware.{js,ts}`)],
  controllers: [join(`${__dirname}/**/*.controller.{js,ts}`)],
});

Swagger.generate();
Db.get().connect();

app.listen(process.env.PORT, () => console.log("api is up and running!")).setTimeout(Number(process.env.SERVER_TIMEOUT_MS));
