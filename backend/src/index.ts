import { Hono } from "hono";
import user from "../routes/user";
import blog from "../routes/blog";

const app = new Hono().basePath("/api/v1");

//Home Route --------------------------------------------------------------------
app.get("/", (c) => {
  return c.json({ messgae: "This is bloggig website home page for backend." });
});

//all user related route
app.route("/", user);

//all post or blog related route
app.route("/blog", blog);

export default app;
