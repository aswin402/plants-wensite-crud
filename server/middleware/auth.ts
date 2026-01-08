import { stackServerApp } from "@/stack/server";
import { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const user = await stackServerApp.getUser();

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", user);

  await next();
};
