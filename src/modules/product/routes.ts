import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  ProductSchema,
  ProductsSchema,
  ProductSlugSchema,
  ProductCategorySchema,
  ProductAuthorSchema,
} from "./schema";
import { db } from "../../lib/db";

export const productRoute = new OpenAPIHono();

// GET all products
productRoute.openapi(
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

productRoute.openapi(
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

productRoute.openapi(
  createRoute({
    method: "get",
    path: "/categories/{categorySlug}",
    request: { params: ProductCategorySchema },
    responses: {
      200: {
        description: "Get product by categories",
        content: { "application/json": { schema: ProductSchema } },
      },
      404: {
        description: "Product by slug not found",
      },
    },
  }),
  async (c) => {
    const { categorySlug } = c.req.valid("param");

    const category = await db.category.findUnique({
      where: { slug: categorySlug },
      select: { id: true },
    });

    if (!category) {
      return c.notFound();
    }

    const targetCategoryId = category.id;

    const products = await db.product.findMany({
      where: {
        categoryId: targetCategoryId,
      },
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (products.length === 0) {
      return c.notFound();
    }

    return c.json(products);
  }
);

productRoute.openapi(
  createRoute({
    method: "get",
    path: "/author/{authorSlug}",
    request: { params: ProductAuthorSchema },
    responses: {
      200: {
        description: "Get product by author",
        content: { "application/json": { schema: ProductsSchema } },
      },
      404: {
        description: "Author or products by author not found",
      },
    },
  }),
  async (c) => {
    const { authorSlug } = c.req.valid("param");

    const author = await db.author.findUnique({
      where: { slug: authorSlug },
      select: { id: true },
    });

    if (!author) {
      return c.notFound();
    }

    const targetAuthorId = author.id;

    const products = await db.product.findMany({
      where: {
        authorId: targetAuthorId,
      },
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (products.length === 0) {
      return c.notFound();
    }

    return c.json(products);
  }
);
