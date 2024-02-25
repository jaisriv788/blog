import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { middleware } from "./middleware";

interface Environment {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}
const app = new Hono<Environment>();

//middleware -------------------------------------------------------------

//below is the example how to implement middle ware through same file.

// app.use("/api/v1/blog/*", async (c, next) => {
//   const token = c.req.header("auth");
//   if (!token) {
//     c.status(403);
//     return c.json({ message: "Token Not Found" });
//   }
//   const decodedToken = await verify(token, c.env.JWT_SECRET);
//   if (!decodedToken) {
//     c.status(402);
//     return c.json({ Message: "Unauthorized" });
//   }
//   c.set("userId", decodedToken.id);
//   await next();
// });

//Signup routes -----------------------------------------------------------

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "Signup successful", token: jwt });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Account with similar email or username is already",
    });
  }
});

//Signin routes --------------------------------------------------------------

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.json({ message: "Something went wrong with signin route." });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "Signin Successful.", token: jwt });
  } catch (e) {
    c.status(404);
    return c.json({ message: "User not found." });
  }
});

//All Blogs -------------------------------------------------------------------

app.get("/api/v1/blog", middleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.post.findMany();
    return c.json({ message: "All Blog", data: allBlogs });
  } catch (e) {
    return c.json({ error: e });
  }
});

//Specific blog -------------------------------------------------------------------

app.get("/api/v1/blog/:id", middleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    return c.json({ messgae: "Post found.", data: blog });
  } catch (e) {
    return c.json({ error: e });
  }
});

//Add post-------------------------------------------------------------------------------

app.post("/api/v1/blog", middleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: userId,
      },
    });

    if (!post) {
      c.status(402);
      return c.json({ error: "Something went wrong in Blog creation." });
    }

    return c.json({ message: "post blog", data: post });
  } catch (e) {
    return c.json({ error: e });
  }
});

//Edit post ---------------------------------------------------------------------

app.put("/api/v1/blog", middleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  try {
    const update = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });

    return c.json({ message: "Blog Updated.", data: update });
  } catch (e) {
    return c.json({ error: e });
  }
});

//Home Route ---------------------------------------------------------------------

app.get("/", (c) => {
  return c.json({ messgae: "This is bloggig website home page for backend." });
});

export default app;
