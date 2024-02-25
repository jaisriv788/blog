import type { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

export const middleware: MiddlewareHandler = async (c, next) => {
  console.log("hello");
  const token = c.req.header("auth");
  if (!token) {
    c.status(403);
    return c.json({ message: "Token Not Found" });
  }
  const decodedToken = await verify(token, c.env.JWT_SECRET);
  if (!decodedToken) {
    c.status(402);
    return c.json({ Message: "Unauthorized" });
  }
  c.set("userId", decodedToken.id);

  await next();
};
