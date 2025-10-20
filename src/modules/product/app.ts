import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import { db } from "../../lib/db";

const app = new OpenAPIHono();

app.use(cors());

app.get("/products/:slug", async (c) => {
  const slug = c.req.param("slug");
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) return c.notFound();

  return c.json(product);
});

app.get("/categories/:categorySlug", async (c) => {
  const categorySlug = c.req.param("categorySlug");
  const products = await db.product.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
  });

  if (!products) return c.notFound();

  return c.json(products);
});

app.post("/products", async (c) => {
  const body = await c.req.json();

  const newProduct = await db.product.create({
    data: {
      slug: body.slug ?? body.title.toLowerCase().replace(/\s+/g, "-"),
      title: body.title,
      author: body.author,
      description: body.description ?? "No description",
      price: body.price,
      originalPrice: body.originalPrice ?? body.price,
      imageUrl: body.imageUrl ?? "https://via.placeholder.com/500x800",
      inStock: body.inStock,
      publishYear: body.publishYear,
      category: { connect: { slug: body.categorySlug } },
    },
    include: { category: true },
  });
  return c.json(newProduct, 201);
});

app.delete("/products/:slug", async (c) => {
  const slug = c.req.param("slug");

  const deletedProduct = await db.product.delete({ where: { slug } });

  return c.json({ deletedProduct: { slug }, message: "deleted successfully" });
});

app.patch("/products/:slug", async (c) => {
  const slug = c.req.param("slug");
  const body = await c.req.json();

  const updatedProduct = await db.product.update({
    where: { slug },
    data: {
      slug: body.slug,
      title: body.title,
      author: body.author,
      description: body.description,
      price: body.price,
      originalPrice: body.originalPrice,
      imageUrl: body.imageUrl,
      inStock: body.inStock,
      publishYear: body.publishYear,
    },
  });

  return c.json(updatedProduct);
});
