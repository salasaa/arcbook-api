import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { productsRoute } from "./modules/product/routes";
import { categoriesRoute } from "./modules/category/routes";
import { authorsRoute } from "./modules/author/routes";
import { usersRoute } from "./modules/user/routes";
import { authRoute } from "./modules/auth/routes";
import { cartRoute } from "./modules/cart/routes";
import { cors } from "hono/cors";

const app = new OpenAPIHono();

app.use(cors());

app.route("/products", productsRoute);
app.route("/categories", categoriesRoute);
app.route("/authors", authorsRoute);
app.route("/users", usersRoute);
app.route("/auth", authRoute);
app.route("/cart", cartRoute);

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
