import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { MoonIcon } from "./icons/MoonIcon"
import { MenuIcon } from "./icons/MenuIcon"
import { MountainIcon } from "./icons/MountainIcon"
import { NavLinks } from "./NavLinks"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          aria-label="Main navigation"
        >
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <Toggle
            aria-label="Toggle dark mode"
            className="rounded-full"
            type="button"
          >
            <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Toggle>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                type="button"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
