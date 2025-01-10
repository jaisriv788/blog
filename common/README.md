# Zod Validation Schemas for User and Post Management

This package provides robust validation schemas using [Zod](https://zod.dev/). These schemas are designed to validate common use cases like user signup, signin, and managing posts. Using these schemas ensures data integrity and simplifies input validation in your applications.

## Installation

Install the package using npm:

```bash
npm i alpha788-typecheck
```

## Exports and Usage

### `signupSchema`

#### Description
`signupSchema` validates data for user signup, ensuring the required fields are present and properly formatted.

#### Fields:
- `email`: Required, string, must be a valid email.
- `name`: Optional, string, converts to uppercase and trims whitespace.
- `password`: Required, string, minimum length of 8 characters.

#### Type:
```typescript
type SignupType = z.infer<typeof signupSchema>;
```

#### Usage
```typescript
import { signupSchema, SignupType } from "your-package-name";

const signupData = {
  email: "test@example.com",
  name: "John Doe",
  password: "securePassword",
};

const result = signupSchema.safeParse(signupData);
if (result.success) {
  const validData: SignupType = result.data;
  console.log(validData);
} else {
  console.error(result.error);
}
```

---

### `signinSchema`

#### Description
`signinSchema` validates data for user signin.

#### Fields:
- `email`: Required, string, must be a valid email.
- `password`: Required, string, minimum length of 8 characters.

#### Type:
```typescript
type SigninType = z.infer<typeof signinSchema>;
```

#### Usage
```typescript
import { signinSchema, SigninType } from "your-package-name";

const signinData = {
  email: "test@example.com",
  password: "securePassword",
};

const result = signinSchema.safeParse(signinData);
if (result.success) {
  const validData: SigninType = result.data;
  console.log(validData);
} else {
  console.error(result.error);
}
```

---

### `postSchema`

#### Description
`postSchema` validates data for creating a post.

#### Fields:
- `title`: Required, string, minimum length of 1 character.
- `content`: Required, string, minimum length of 1 character.
- `published`: Required, boolean.

#### Type:
```typescript
type PostType = z.infer<typeof postSchema>;
```

#### Usage
```typescript
import { postSchema, PostType } from "your-package-name";

const postData = {
  title: "My First Post",
  content: "This is the content of the post.",
  published: true,
};

const result = postSchema.safeParse(postData);
if (result.success) {
  const validData: PostType = result.data;
  console.log(validData);
} else {
  console.error(result.error);
}
```

---

### `postUpdateSchema`

#### Description
`postUpdateSchema` validates data for updating a post.

#### Fields:
- `id`: Required, string, must not be empty.
- `title`: Optional, string, minimum length of 1 character.
- `content`: Optional, string, minimum length of 1 character.
- `published`: Optional, boolean.

#### Type:
```typescript
type PostUpdate = z.infer<typeof postUpdateSchema>;
```

#### Usage
```typescript
import { postUpdateSchema, PostUpdate } from "your-package-name";

const postUpdateData = {
  id: "postId123",
  title: "Updated Title",
};

const result = postUpdateSchema.safeParse(postUpdateData);
if (result.success) {
  const validData: PostUpdate = result.data;
  console.log(validData);
} else {
  console.error(result.error);
}
```

---

## Summary

This package simplifies input validation with ready-to-use Zod schemas for user and post management. Each schema is designed to handle specific use cases, ensuring your application receives valid and sanitized data.
