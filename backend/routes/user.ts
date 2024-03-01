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
    return c.json({
      message: typecheck.error.issues[0].message,
      status: false,
    });
  }

  const body = typecheck.data;

  try {
    await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    return c.json({ message: "Signup successful.", status: true });
  } catch (e) {
    return c.json({
      message: "Account with similar email already exist.",
      status: false,
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
    return c.json({
      message: typecheck.error.issues[0].message,
      status: false,
    });
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
      return c.json({ message: "Either email or password is incorrect." });
    }
    const payload = {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) +( 60 * 60),
    };
    const jwt = await sign(payload, c.env.JWT_SECRET);
    return c.json({ message: "Signin Successful.", token: jwt, status: true });
  } catch (e) {
    return c.json({ message: "User not found.", status: false });
  }
});

export default user;
