import { Hono } from "hono";
import { prisma } from "./lib/prisma";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Arcbook Backend REST API!",
  });
});

app.get("/products", async (c) => {
  const products = await prisma.product.findMany();
  return c.json(products);
});

app.get("/products/:slug", async (c) => {
  const slug = c.req.param("slug");
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) return c.notFound();

  return c.json(product);
});

app.get("products/category/:categorySlug", async (c) => {
  const categorySlug = c.req.param("categorySlug");
  const products = await prisma.product.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
  });

  if (!products) return c.notFound();

  return c.json(products);
});

export default app;
