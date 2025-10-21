import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { CategorySchema, CategorySlugSchema } from "./schema";
import { db } from "../../lib/db";

export const categoryRoute = new OpenAPIHono();

categoryRoute.openapi(
  createRoute({
    method: "get",
    path: "/{categorySlug}",
    request: { params: CategorySlugSchema },
    responses: {
      200: {
        description: "Get category by slug",
        content: { "application/json": { schema: CategorySchema } },
      },
      404: {
        description: "Category by slug not found",
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
