import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User as UserIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"

type User = {
  email?: string
  family_name?: string
  given_name?: string
  picture?: string
}

export function UserAvatar({ user }: { user?: User }) {
  const fallbackName =
    `${user?.given_name?.[0] ?? ""}${user?.family_name?.[0] ?? ""}` || "JD"

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET"
      })
      if (res.redirected) {
        window.location.href = res.url
      } else {
        // fallback in case redirect doesn't work
        window.location.href = "/"
      }
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            {user?.picture ? (
              <AvatarImage
                src={user.picture}
                alt={user.email ?? "User avatar"}
              />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {fallbackName}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.given_name ?? "John"} {user?.family_name ?? "Doe"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? "john.doe@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to="/profile"
              className="flex items-center w-full text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <UserIcon className="w-4 h-4 mr-2" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/settings"
              className="flex items-center w-full text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
