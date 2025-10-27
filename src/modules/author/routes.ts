import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { AuthorSchema, AuthorSlugSchema } from "./schema";
import { db } from "../../lib/db";

export const authorsRoute = new OpenAPIHono();

authorsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{authorSlug}",
    request: { params: AuthorSlugSchema },
    responses: {
      200: {
        description: "Get product by author",
        content: { "application/json": { schema: AuthorSchema } },
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
