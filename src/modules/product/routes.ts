import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ProductSchema, ProductsSchema, ProductSlugSchema } from "./schema";
import { db } from "../../lib/db";

export const productsRoute = new OpenAPIHono();

// GET all products
productsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Get all products",
      },
    },
  }),
  async (c) => {
    const products = await db.product.findMany({
      include: {
        category: true,
        author: true,
      },
    });
    const formattedProducts = products.map((product) => {
      return {
        ...product,
      };
    });
    return c.json(formattedProducts);
  }
);

productsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    request: { params: ProductSlugSchema },
    responses: {
      200: {
        description: "Get one product by slug",
        content: { "application/json": { schema: ProductSchema } },
      },
      404: {
        description: "Product by slug not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const product = await db.product.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
      },
    });

    if (!product) {
      return c.notFound();
    }

    return c.json(product);
  }
);
