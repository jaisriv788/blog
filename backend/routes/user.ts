import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupSchema, signinSchema } from "alpha788-blog-typecheck";

interface Environment {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}

const user = new Hono<Environment>();

//Signup routes -----------------------------------------------------------

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const data = await c.req.json();
  const typecheck = signupSchema.safeParse(data);
  if (!typecheck.success) {
    return c.json({ messgae: typecheck.error.issues[0].message });
  }

  const body = typecheck.data;

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

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const data = await c.req.json();
  const typecheck = signinSchema.safeParse(data);
  if (!typecheck.success) {
    return c.json({ messgae: typecheck.error.issues[0].message });
  }

  const body = typecheck.data;

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

export default user;
