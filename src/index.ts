import path from "path";
import { Mongo } from "./core/db";
import { createExpressServer } from "routing-controllers";

Mongo.get().connect();

const app = createExpressServer({
  routePrefix: "/api",
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
  },
  middlewares: [],
  controllers: [path.join(__dirname + "/**/*.controller.{js,ts}")],
});

app.listen(process.env.PORT, () => console.log("matsher api is up and running!"));
