import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { productRoute } from "./modules/product/routes";
import { categoryRoute } from "./modules/category/routes";
import { authorRoute } from "./modules/author/routes";
import { userRoute } from "./modules/user/routes";
import { cors } from "hono/cors";

const app = new OpenAPIHono();

app.use(cors());

app.route("/products", productRoute);
app.route("/categories", categoryRoute);
app.route("/authors", authorRoute);
app.route("/users", userRoute);

// The OpenAPI documentation
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Arcbooks API",
    version: "1.0.0",
  },
});

// Use the middleware to serve the Scalar API Reference at /scalar
app.get(
  "/",
  Scalar({
    pageTitle: "Arcbooks API",
    url: "/openapi.json",
  })
);

export default app;
