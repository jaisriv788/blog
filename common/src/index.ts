import z from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .trim()
    .toLowerCase(),
  name: z.string().toUpperCase().trim().optional(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Minimum Password Length : 8" }),
});

export type SignupType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Minimum Password Length : 8" }),
});

export type SigninType = z.infer<typeof signinSchema>;

export const postSchema = z.object({
  title: z.string().trim().min(1, { message: "Enter something in title" }),
  content: z.string().trim().min(1, { message: "Enter something in content" }),
  published: z.boolean(),
});

export type PostType = z.infer<typeof postSchema>;

export const postUpdateSchema = z.object({
  id: z.string().min(1, { message: "Id can not be empty" }),
  title: z
    .string()
    .trim()
    .min(1, { message: "Enter something in title" })
    .optional(),
  content: z
    .string()
    .trim()
    .min(1, { message: "Enter something in content" })
    .optional(),
  published: z.boolean().optional(),
});

export type PostUpdate = z.infer<typeof postUpdateSchema>;
