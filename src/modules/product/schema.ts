import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  price: z.number(),
  originalPrice: z.number(),
  categorySlug: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string(),
  inStock: z.boolean(),
  publishYear: z.number(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);
