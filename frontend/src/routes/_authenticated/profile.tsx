import { createFileRoute, Link } from "@tanstack/react-router"
import { userQueryOptions } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions)

  if (error) return <div aria-live="polite">An error has occurred: {error.message}</div>
  if (isPending) return <div aria-live="polite">Loading...</div>
  if (!data) return <div aria-live="polite">No user data found</div>

  return (
    <div className="p-2">
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
        {/* Optionally show avatar if available */}
        {data.user.picture && (
          <img
            src={data.user.picture}
            alt={data.user.email}
            className="w-16 h-16 mt-2 rounded-full"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <Link to="/logout" className="text-blue-500 hover:underline">
        Logout
      </Link>
    </div>
  )
}
