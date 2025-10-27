import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import {
  UserSchema,
  RegisterUserSchema,
  LoginUserSchema,
  LoginResponseSchema,
} from "../user/schema";
import { hashPassword, verifyPassword } from "../../lib/password";

export const authRoute = new OpenAPIHono();

// Register
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: { content: { "application/json": { schema: RegisterUserSchema } } },
    },
    responses: {
      200: {
        content: { "application/json": { schema: UserSchema } },
        description: "Successfully Registered",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await db.user.create({
      data: {
        email: body.email,
        password: {
          create: { hash: await hashPassword(body.password) },
        },
      },
      omit: { email: true },
    });

    return c.json(user);
  }
);

// Login
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: {
      body: { content: { "application/json": { schema: LoginUserSchema } } },
    },
    responses: {
      200: {
        content: { "application/json": { schema: LoginResponseSchema } },
        description: "Successfully Logged In",
      },
      404: { description: "Failed toLogin" },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await db.user.findUnique({
      where: { email: body.email },
      include: { password: true },
    });
    if (!user) {
      return c.json({ message: "User not found" }, 400);
    }
    if (!user.password?.hash) {
      return c.json({ message: "User doesn't have a password" }, 400);
    }

    const isValid = await verifyPassword(user.password.hash, body.password);
    if (!isValid) {
      return c.json({ message: "Invalid password" }, 400);
    }

    console.log({ user });

    return c.json({
      isValid,
      user,
    });
  }
);
