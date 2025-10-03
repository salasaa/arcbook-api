import { Hono } from "hono";
import { db } from "./lib/db";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Arcbook Backend REST API!",
  });
});

app.get("/products", async (c) => {
  const products = await db.product.findMany();
  return c.json(products);
});

app.get("/products/:slug", async (c) => {
  const slug = c.req.param("slug");
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) return c.notFound();

  return c.json(product);
});

app.get("products/category/:categorySlug", async (c) => {
  const categorySlug = c.req.param("categorySlug");
  const products = await db.product.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
  });

  if (!products) return c.notFound();

  return c.json(products);
});

// app.post("/products", async (c) => {
//   const body = await c.req.json();

//   const newProduct = await db.product.create({
//     data: {
//       slug: body.slug,
//       title: body.title,
//       author: body.author,
//       description: body.description,
//       price: body.price,
//       originalPrice: body.originalPrice,
//       imageUrl: body.imageUrl,
//       inStock: body.inStock,
//       publishYear: body.publishYear,
//       category: { connect: { slug: body.categorySlug } },
//     },
//   });
// });

export default app;
