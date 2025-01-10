# Zod Schemas for Signup, Signin, and Posts

This package provides validation schemas using [Zod](https://github.com/colinhacks/zod) for common operations such as user signup, signin, and managing posts. The schemas ensure data integrity and can be used in applications to validate incoming requests or form inputs.

## Installation

```bash
npm install your-package-name
```

## Exports

### `signupSchema`

#### Description
`signupSchema` is a Zod object schema that validates the data for user signup.

#### Fields:
- `email`: Required, string.
- `name`: Optional, string.
- `password`: Required, string.

#### Type:
```typescript
type SignupType = z.infer<typeof signupSchema>;
```

#### Usage
```typescript
import { signupSchema, SignupType } from "your-package-name";

const signupData = {
  email: "test@example.com",
  password: "password123",
  name: "John Doe",
};

const result = signupSchema.safeParse(signupData);
if (result.success) {
  const validData: SignupType = result.data;
  console.log(validData);
} else {
  console.error(result.error);
}
```

### `signinSchema`

#### Description
`signinSchema` validates the data for user signin.

#### Fields:
- `email`: Required, string.
- `password`: Required, string.

#### Type:
```typescript
type SigninType = z.infer<typeof signinSchema>;
```

#### Usage
```typescript
import { signinSchema, SigninType } from "your-package-name";

const signinData = {
  email: "test@example.com",
  password: "password123",
};

const result = signinSchema.safeParse(signinData);
if (result.success) {
  const validData: SigninType = result.data;
  console.log(validData);
} else {
  console.error(result.error);
}
```

### `postSchema`

#### Description
`postSchema` validates the data for creating a post.

#### Fields:
- `title`: Required, string.
- `content`: Required, string.
- `published`: Required, boolean.

#### Type:
```typescript
type PostType = z.infer<typeof postSchema>;
```

#### Usage
```typescript
import { postSchema, PostType } from "your-package-name";

const postData = {
  title: "New Post",
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

### `postUpdateSchema`

#### Description
`postUpdateSchema` validates the data for updating a post.

#### Fields:
- `id`: Required, string.
- `title`: Optional, string.
- `content`: Optional, string.
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

## Summary

This package provides robust Zod schemas for validating signup, signin, and post data. By using these schemas, you can ensure the correctness of your data and simplify validation logic in your application.
