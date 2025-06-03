import { Outlet } from "@tanstack/react-router"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_public")({
  beforeLoad: async () => {
    const res = await fetch("/api/me")
    const data = await res.json()

    // Redirect logged-in users to the dashboard
    if (data.user) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: PublicLayout
})

function PublicLayout() {
  return <Outlet />
}
