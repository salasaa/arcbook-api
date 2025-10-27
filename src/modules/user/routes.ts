import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { UserSchema, UsersSchema } from "../user/schema";
import { db } from "../../lib/db";
import { z } from "@hono/zod-openapi";

export const usersRoute = new OpenAPIHono();

// GET all users
usersRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: UsersSchema } },
        description: "Get all users",
      },
    },
  }),
  async (c) => {
    const users = await db.user.findMany({
      omit: { email: true },
    });

    return c.json(users);
  }
);

usersRoute.openapi(
  createRoute({
    method: "get",
    path: "/:id",
    request: { params: z.object({ id: z.string() }) },
    responses: {
      200: {
        description: "Get one user by id",
        content: { "application/json": { schema: UserSchema } },
      },
      404: {
        description: "user by id not found",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const user = await db.user.findUnique({
      where: { id },
      omit: { email: true },
    });

    if (!user) {
      return c.notFound();
    }

    return c.json(user);
  }
);
