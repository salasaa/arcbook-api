import { z } from "@hono/zod-openapi";

export const AuthorSchema = z.object({
  id: z.string(),
  slug: z.string().nullable(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthorSlugSchema = z.object({
  authorSlug: z.string().openapi({ example: "author-slug" }),
});
