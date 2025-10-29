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
      400: { description: "Failed to Login" },
      404: { description: "User not found" },
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

      const isValid = await verifyPassword(user.password.hash, body.password);
      if (!isValid) {
        return c.json({ message: "Invalid password" }, 400);
      }

      const payload = {
        sub: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 5,
      };
      const tokenSecretKey = String(process.env.TOKEN_SECRET_KEY);
      const token = await sign(payload, tokenSecretKey);

      return c.text(token);
    } catch (error) {
      return c.json({ message: "Email or password is incorrect" }, 400);
    }
  }
);
