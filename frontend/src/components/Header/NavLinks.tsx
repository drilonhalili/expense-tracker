import { Link } from "@tanstack/react-router"

const NAV_ITEMS = [
  { name: "About", href: "/about" },
  { name: "Expenses", href: "/expenses" },
  { name: "Create Expense", href: "/create-expense" },
  { name: "Profile", href: "/profile" }
]

export function NavLinks() {
  return (
    <>
      {NAV_ITEMS.map(item => (
        <Link
          key={item.name}
          to={item.href}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm font-medium"
        >
          {item.name}
        </Link>
      ))}
    </>
  )
}
