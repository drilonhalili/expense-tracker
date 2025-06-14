import app from "./app";

Bun.serve({
  fetch: app.fetch,
  port: 5174,
});

console.log("Server is running")
