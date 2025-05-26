import { userQueryOptions } from "@/lib/api"
import { Outlet } from "@tanstack/react-router"
import { createFileRoute } from "@tanstack/react-router"

const Login = () => {
  return (
    <div className="p-2">
      <h2>Please log in</h2>
      <p>You must be logged in to access this page.</p>
      <a href="/api/login" className="text-blue-500 hover:underline">
        Log in
      </a>
    </div>
  )
}

const Component = () => {
  const { user } = Route.useRouteContext()
  if (!user) {
    return <Login />
  }

  return <Outlet />
}

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient

    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      return null
    }
  },
  component: Component
})
