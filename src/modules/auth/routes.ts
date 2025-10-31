import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import {
  UserSchema,
  RegisterUserSchema,
  LoginUserSchema,
  LoginResponseSchema,
} from "../user/schema";
import { hashPassword, verifyPassword } from "../../lib/password";
import { sign, verify } from "hono/jwt";
import { signToken } from "../../lib/token";
import { checkAuthorized } from "./middleware";

export const authRoute = new OpenAPIHono();

// POST /register
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: { content: { "application/json": { schema: RegisterUserSchema } } },
    },
    responses: {
      201: {
        content: { "application/json": { schema: UserSchema } },
        description: "Successfully Registered",
      },
      400: { description: "Failed to Resgister" },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    try {
      const hash = await hashPassword(body.password);
      const user = await db.user.create({
        data: {
          username: body.username,
          email: body.email,
          fullName: body.fullName,
          password: {
            create: { hash },
          },
        },
      });
      return c.json(user, 201);
    } catch (error) {
      return c.json({ message: "Username or email already exists" }, 400);
    }
  }
);

// POST /login
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: {
      body: { content: { "application/json": { schema: LoginUserSchema } } },
    },
    responses: {
      200: {
        content: { "text/plain": { schema: LoginResponseSchema } },
        description: "Successfully Logged In",
      },
      400: { description: "Failed to Login" },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    try {
      const user = await db.user.findUnique({
        where: { email: body.email },
        include: { password: true },
      });

      if (!user) {
        return c.json({ message: "User not found" }, 404);
      }

      if (!user.password?.hash) {
        return c.json({ message: "User doesn't have a password" }, 400);
      }

      const token = await signToken(user.id);

      return c.text(token);
    } catch (error) {
      return c.json({ message: "Email or password is incorrect" }, 400);
    }
  }
);

// GET /me - Get current user
authRoute.openapi(
  createRoute({
    method: "get",
    path: "/me",
    middleware: checkAuthorized,
    responses: {
      200: {
        description: "Get authenticated user",
        content: { "application/json": { schema: UserSchema } },
      },
    },
  }),
  async (c) => {
    const user = c.get("user");

    return c.json(user);
  }
);
