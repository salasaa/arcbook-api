import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  id: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UsersSchema = z.array(UserSchema);

export const RegisterUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const LoginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});
