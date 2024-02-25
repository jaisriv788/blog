import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { middleware } from "../middleware/middleware";
import { postSchema, postUpdateSchema } from "alpha788-blog-typecheck";

interface Environment {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}

const blog = new Hono<Environment>();

//All Blogs -------------------------------------------------------------------

blog.get("/", middleware, async (c) => {
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

blog.get("/:id", middleware, async (c) => {
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

blog.post("/", middleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const data = await c.req.json();
  const typecheck = postSchema.safeParse(data);
  if (!typecheck.success) {
    return c.json({ messgae: typecheck.error.issues[0].message });
  }

  const body = typecheck.data;
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

blog.put("/", middleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const data = await c.req.json();
  const typecheck = postUpdateSchema.safeParse(data);
  if (!typecheck.success) {
    return c.json({ messgae: typecheck.error.issues[0].message });
  }

  const body = typecheck.data;
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

export default blog;
