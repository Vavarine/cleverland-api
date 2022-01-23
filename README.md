# Cleverland API

## User methods

### Paths

| Path  | Method | Description             | Expected           | Return   |
| ----- | ------ | ----------------------- | ------------------ | -------- |
| /     | get    | Lists all created users |                    | `User[]` |
| /     | post   | Create user data        | `UserCreationData` |          |
| /auth | get    | Lists all created users | `UserCredentials`  | `User`   |

### Types

```ts
type User {
  id: string
  email: string
  name: string
}

type UserCreationData {
  email: string
  name: string
  password: string
}

type UserCredentials {
  email: string
  password: string
}
```
