import { StackServerApp } from "@stackframe/stack";

// Create a mock or fallback configuration if environment variables are missing
const createStackServerApp = () => {
  const secretKey = process.env.STACK_SECRET_SERVER_KEY;
  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
  const publishableClientKey =
    process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

  if (!secretKey || !projectId || !publishableClientKey) {
    console.warn(
      "Stack Auth environment variables are missing. Stack Auth features will be limited."
    );
    // Return a mock object to prevent runtime errors
    return {
      getUser: async () => null,
      signUpWithCredential: async () => {
        throw new Error("Stack Auth not configured");
      },
      signInWithCredential: async () => {
        throw new Error("Stack Auth not configured");
      },
      signInWithOAuth: async () => {
        throw new Error("Stack Auth not configured");
      },
      sendForgotPasswordEmail: async () => {
        throw new Error("Stack Auth not configured");
      },
      resetPassword: async () => {
        throw new Error("Stack Auth not configured");
      },
      handler: async () => {
        return new Response(
          JSON.stringify({ error: "Stack Auth not configured" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      },
    };
  }

  return new StackServerApp({
    projectId,
    publishableClientKey,
    secretServerKey: secretKey,
    tokenStore: "nextjs-cookie",
    urls: {
      signIn: "/auth/signin",
      signUp: "/auth/signup",
      afterSignIn: "/auth/callback", // Changed to callback for smart redirection
      afterSignUp: "/auth/callback", // Changed to callback for smart redirection
      handler: "/handler", // Stack Auth API handler
    },
  });
};

export const stackServerApp = createStackServerApp();
