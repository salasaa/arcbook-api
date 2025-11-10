import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "../../lib/db";

import { checkAuthorized } from "../auth/middleware";
import { CartSchema, CartItemSchema, AddCartItemSchema } from "./schema";

export const cartRoute = new OpenAPIHono();

// GET /cart
cartRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    middleware: checkAuthorized,
    responses: {
      200: {
        description: "Get cart",
        content: { "application/json": { schema: CartSchema } },
      },
      401: {
        description: "Unauthorized",
      },
    },
  }),
  async (c) => {
    const user = c.get("user");

    const cart = await db.cart.findFirst({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      const newCart = await db.cart.create({
        data: { userId: user.id },
        include: { items: { include: { product: true } } },
      });

      return c.json(newCart);
    }

    return c.json(cart);
  }
);

// POST /cart/items
cartRoute.openapi(
  createRoute({
    method: "post",
    path: "/items",
    middleware: checkAuthorized,
    request: {
      body: { content: { "application/json": { schema: AddCartItemSchema } } },
    },
    responses: {
      200: {
        description: "Add item to cart",
        content: { "application/json": { schema: CartItemSchema } },
      },
      400: {
        description: "Failed to add items to cart",
      },
    },
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const user = c.get("user");

      const cart = await db.cart.findFirst({
        where: { userId: user.id },
      });

      if (!cart) {
        return c.json({ message: "Cart not found" }, 400);
      }

      const newCartItems = await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId: body.productId,
          quantity: body.quantity,
        },
        include: { product: true },
      });

      return c.json(newCartItems);
    } catch (error) {
      return c.json({ message: "Failed to add item to cart" }, 400);
    }
  }
);
