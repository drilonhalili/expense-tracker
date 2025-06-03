import { Hono } from "hono"
import { kindeClient, sessionManager, getUser } from "../kinde"

export const authRoute = new Hono()
  // Login route: redirects to login with optional redirect state
  .get("/login", async c => {
    const redirectTo = c.req.query("redirect") || "/dashboard"
    const loginUrl = await kindeClient.login(sessionManager(c), {
      state: encodeURIComponent(redirectTo),
    })
    return c.redirect(loginUrl.toString())
  })

  // Register route: redirects to registration
  .get("/register", async c => {
    const registerUrl = await kindeClient.register(sessionManager(c))
    return c.redirect(registerUrl.toString())
  })

  // Callback route: handles auth callback and redirects to original destination
  .get("/callback", async c => {
    const url = new URL(c.req.url)
    await kindeClient.handleRedirectToApp(sessionManager(c), url)

    const redirectTo = url.searchParams.get("state") || "/"
    return c.redirect(decodeURIComponent(redirectTo))
  })

  // Logout route: redirects to logout
  .get("/logout", async c => {
    const logoutUrl = await kindeClient.logout(sessionManager(c))
    return c.redirect(logoutUrl.toString())
  })

  // Get current user info
  .get("/me", getUser, async c => {
    const user = c.var.user
    return c.json({ user })
  })
