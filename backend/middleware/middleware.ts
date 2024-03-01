import type { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

export const middleware: MiddlewareHandler = async (c, next) => {
  try {
    const token = c.req.header("auth");
    if (!token) {
      c.status(403);
      return c.json({ message: "Token Not Found" });
    }
    const decodedToken = await verify(token, c.env.JWT_SECRET);
    console.log(decodedToken.id);
    c.set("userId", decodedToken.id);
    await next();
  } catch (e) {
    return c.json({ message: e, tokenExpired: true });
  }
};
