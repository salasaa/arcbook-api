import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string().nullable(),
  title: z.string(),
  authorId: z.string().nullable(),
  price: z.number(),
  originalPrice: z.number(),
  categoryId: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string(),
  inStock: z.boolean(),
  publishYear: z.number(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);

export const ProductSlugSchema = z.object({
  slug: z.string().openapi({ example: "product-slug" }),
});

export const ProductIdSchema = z.object({
  id: z.string(),
});

export const ProductCreateSchema = ProductSchema.omit({ id: true });
