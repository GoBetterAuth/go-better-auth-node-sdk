# GoBetterAuth Node.js SDK

Official GoBetterAuth SDK. This SDK provides seamless integration with GoBetterAuth authentication server for both client-side and server-side applications and is framework agnostic (React, Vue.js and more).

## Features

- **Framework Agnostic**: Works with React, Vue.js, Angular, and more
- **Full TypeScript Support**: Complete TypeScript definitions with strict typing
- **SSR Safe**: Supports proper cookie handling for SSR apps
- **CSRF Protection**: Automatic CSRF token handling for mutating requests
- **Multiple Auth Methods**: Email/password, OAuth2, JWT-based authentication
- **Plugin Architecture**: Extensible plugin system for custom authentication flows
- **Automatic Token Refresh**: Built-in bearer token refresh mechanism

## Installation

```bash
npm install go-better-auth
# or
yarn add go-better-auth
# or
pnpm add go-better-auth
```

## Quick Start

### Basic Setup

```typescript
import { createClient } from "go-better-auth";
import { EmailPasswordPlugin } from "go-better-auth/plugins";

// Create a client instance
const goBetterAuthClient = createClient({
  url: "http://localhost:8080", // Your GoBetterAuth server URL
  plugins: [
    new EmailPasswordPlugin()
  ]
});

// Now you can use the client to perform authentication operations
```

### Using with Cookies (SSR Compatible)

For server-side rendering or applications that need to handle cookies properly:

```typescript
import { cookies } from "next/headers";

import { createClient } from "go-better-auth";
import { EmailPasswordPlugin, CSRFPlugin } from "go-better-auth/plugins";

const goBetterAuthClient = createClient({
  url: "http://localhost:8080/auth",
  cookies: cookies, // Provide cookie store for SSR
  plugins: [
    new EmailPasswordPlugin(),
    new CSRFPlugin({
      cookieName: "csrf_token",
      headerName: "X-CSRF-TOKEN"
    })
  ]
});
```

## Available Plugins

### Email Password Plugin

Handles traditional email/password authentication flows.

```typescript
import { EmailPasswordPlugin } from "go-better-auth/plugins";

const goBetterAuthClient = createClient({
  url: "http://localhost:8080",
  plugins: [
    new EmailPasswordPlugin()
  ]
});

// Sign up
await goBetterAuthClient.emailPassword.signUp({
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123"
});

// Sign in
const response = await goBetterAuthClient.emailPassword.signIn({
  email: "john@example.com",
  password: "securePassword123"
});

// Send email verification
await goBetterAuthClient.emailPassword.sendEmailVerification({
  email: "john@example.com"
});

// Request password reset
await goBetterAuthClient.emailPassword.requestPasswordReset({
  email: "john@example.com"
});

// Change password
await goBetterAuthClient.emailPassword.changePassword({
  token: "reset-token",
  password: "newSecurePassword123"
});
```

### OAuth2 Plugin

Handles OAuth2 authentication with popular providers.

```typescript
import { OAuth2Plugin } from "go-better-auth/plugins";

const goBetterAuthClient = createClient({
  url: "http://localhost:8080/auth",
  plugins: [
    new OAuth2Plugin()
  ]
});

// Redirect user to OAuth2 provider
const response = await goBetterAuthClient.oauth2.signIn({
  provider: "google", // or "github", "discord"
  redirect_to: "http://localhost:3000/callback"
});

// Redirect user to the authUrl
window.location.href = response.auth_url;
```

### CSRF Plugin

Provides automatic CSRF protection for mutating requests.

```typescript
import { CSRFPlugin } from "go-better-auth/plugins";

const goBetterAuthClient = createClient({
  url: "http://localhost:8080/auth",
  cookies: ..., // Provide cookie store for SSR if needed, else omit for SPA/Mobile apps
  plugins: [
    new CSRFPlugin({
      cookieName: "csrf_token",    // Name of the CSRF token cookie
      headerName: "X-CSRF-TOKEN"   // Header name to send the token
    })
  ]
});

// CSRF tokens will be automatically added to mutating requests (POST, PUT, PATCH, DELETE)
```

### JWT Plugin

Handles JWT token operations including refresh.

```typescript
import { JWTPlugin } from "go-better-auth/plugins";

const goBetterAuthClient = createClient({
  url: "http://localhost:8080/auth",
  plugins: [
    new JWTPlugin()
  ]
});

// Refresh JWT tokens
const tokens = await goBetterAuthClient.jwt.refreshToken({
  refresh_token: "your-refresh-token"
});

// Get JWKS keys
const jwksKeys = await goBetterAuthClient.jwt.getJWKSKeys();
```

### Bearer Plugin

Provides automatic bearer token handling and refresh.

```typescript
import { BearerPlugin, JWTPlugin } from "go-better-auth/plugins";

const goBetterAuthClient = createClient({
  url: "http://localhost:8080/auth",
  plugins: [
    new JWTPlugin(),
    new BearerPlugin({
      headerName: "Authorization" // Can be omitted as default is Authorization
    })
  ]
});

// The Bearer plugin will automatically:
// 1. Add Authorization: Bearer <token> header to requests
// 2. Handle token refresh when receiving 401 responses
// 3. Store tokens in localStorage (access_token and refresh_token)
```

## Advanced Configuration

### Fetch Options

Configure fetch behavior with timeout and other options:

```typescript
const goBetterAuthClient = createClient({
  url: "http://localhost:8080/auth",
  fetchOptions: {
    abortTimeout: 30 // Timeout in seconds
  },
  plugins: [
    // your plugins
  ]
});
```

### Custom Hooks

Add custom before/after fetch hooks for advanced customization:

```typescript
const goBetterAuthClient = createClient({
  url: "http://localhost:8080/auth",
  plugins: [
    new EmailPasswordPlugin()
  ]
});

// Register a before fetch hook
goBetterAuthClient.registerBeforeFetch(async (ctx) => {
  console.log(`Making request to: ${ctx.url}`);
  // Modify context if needed
  ctx.init.headers = {
    ...ctx.init.headers,
    "X-Custom-Header": "value"
  };
});

// Register an after fetch hook
goBetterAuthClient.registerAfterFetch(async (ctx, response) => {
  console.log(`Received response: ${response.status}`);
  if (response.status >= 400) {
    // Handle error
  }
});
```

## API Reference

### Client Configuration

```typescript
{
  // Base URL of your GoBetterAuth server
  url: string,
  // Optional fetch configuration
  fetchOptions?: {
    // Request timeout in seconds
    abortTimeout?: number 
  },
  // Cookie provider for SSR compatibility
  cookies?: () => CookieStore 
}
```

### Available Methods

Once plugins are initialized, they expose methods on the client:

## API Reference

`EmailPassword Plugin`:

| Method                                      | Description                  |
|---------------------------------------------|------------------------------|
| `client.emailPassword.signUp(data)`         | Create a new user account    |
| `client.emailPassword.signIn(data)`         | Authenticate a user          |
| `client.emailPassword.sendEmailVerification(data)` | Send email verification      |
| `client.emailPassword.requestPasswordReset(data)` | Request password reset       |
| `client.emailPassword.changePassword(data)` | Change user password         |
| `client.emailPassword.requestEmailChange(data)` | Request email change         |

`OAuth2 Plugin`:

| Method                                      | Description                  |
|---------------------------------------------|------------------------------|
| `client.oauth2.signIn(data)`                | Initiate OAuth2 flow         |

`JWT Plugin`:

| Method                                      | Description                  |
|---------------------------------------------|------------------------------|
| `client.jwt.refreshToken(data)`             | Refresh JWT tokens           |
| `client.jwt.getJWKSKeys()`                  | Get JWKS keys                |

## Error Handling

All methods return promises that can be caught for error handling:

```typescript
try {
  const response = await goBetterAuthClient.emailPassword.signIn({
    email: "user@example.com",
    password: "password"
  });
  console.log("Signed in successfully", response);
} catch (error) {
  console.error("Sign in failed:", error);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.
