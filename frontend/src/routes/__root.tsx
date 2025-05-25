import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRoute({
  component: Root,
})

function NavBar() {
  return (
    <nav className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>
      <Link to="/create-expense" className="[&.active]:font-bold">
        Create Expense
      </Link>
    </nav>
  )
}

function Root() {
  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <NavBar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}
