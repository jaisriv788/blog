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

blog.use("/*", middleware);
//All Blogs -------------------------------------------------------------------

blog.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return c.json({ message: "All Blog", data: allBlogs, status: true });
  } catch (e) {
    return c.json({ message: e, status: false });
  }
});

//My blogs

blog.get("/myblogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.get("userId");
    if (!id) {
      return c.json({ message: "You are not loggedin.", status: false });
    }
    const myblogs = await prisma.post.findMany({
      where: {
        authorId: id,
      },
    });
    return c.json({ message: "Blogs fond.", status: true, data: myblogs });
  } catch (e) {
    return c.json({ message: "Error in finding your blogs.", status: false });
  }
});

//Specific blog -------------------------------------------------------------------

blog.get("/:id", async (c) => {
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
    return c.json({ messgae: "Post found.", data: blog, status: true });
  } catch (e) {
    return c.json({ message: e, status: false });
  }
});

//Add post-------------------------------------------------------------------------------

blog.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const data = await c.req.json();
  const typecheck = postSchema.safeParse(data);
  if (!typecheck.success) {
    return c.json({
      message: typecheck.error.issues[0].message,
      status: false,
    });
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
    return c.json({ message: "post blog", data: post, status: true });
  } catch (e) {
    return c.json({ message: e, status: false });
  }
});

//Edit post ---------------------------------------------------------------------

blog.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const data = await c.req.json();
  const typecheck = postUpdateSchema.safeParse(data);
  if (!typecheck.success) {
    return c.json({
      messgae: typecheck.error.issues[0].message,
      status: false,
    });
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
    return c.json({ message: "Blog Updated.", data: update, status: true });
  } catch (e) {
    return c.json({ message: e, status: false });
  }
});

//delete specific post

blog.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");
  try {
    const blog = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return c.json({ messgae: "Post deleted.", data: blog, status: true });
  } catch (e) {
    return c.json({ message: e, status: false });
  }
});

export default blog;
