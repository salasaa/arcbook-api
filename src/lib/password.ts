import * as argon2 from "argon2";

// const hash = await argon2.hash("password");

// const isMatched = await argon2.verify(hash, "password");

export async function hashPassword(password: string): Promise<string> {
  const hash = await argon2.hash(password);
  return hash;
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  const isValid = await argon2.verify(hash, password);
  return isValid;
}
