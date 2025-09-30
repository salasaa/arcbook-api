import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Arcbook Backend REST API!",
  });
});

export default app;
