import { createFileRoute } from "@tanstack/react-router"
import { userQueryOptions } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions)

  if (error) return "An error has occurred: " + error.message
  if (isPending) return "Loading..."
  if (!data) return "No user data found"

  return (
    <div className="p-2">
      Hello from Profile!
      <div className="mt-4">
        <h2 className="text-lg font-semibold">User Information</h2>
        <p>
          <strong>ID:</strong> {data.user.id}
        </p>
        <p>
          <strong>Email:</strong> {data.user.email}
        </p>
        <p>
          <strong>Username:</strong> {data.user.family_name}
        </p>
      </div>
      <a href="/api/logout" className="text-blue-500 hover:underline">
        Logout
      </a>
    </div>
  )
}
