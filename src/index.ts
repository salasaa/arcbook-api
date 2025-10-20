import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { Scalar } from "@scalar/hono-api-reference";

import { productRoute } from "./modules/product/routes";

const app = new OpenAPIHono();

app.use(cors());

app.route("/products", productRoute);

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
