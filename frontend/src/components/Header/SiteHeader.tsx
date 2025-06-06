import { useQuery } from "@tanstack/react-query"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SearchForm } from "@/components/Search/SearchForm"
import { Skeleton } from "@/components/ui/skeleton"
import { userQueryOptions } from "@/lib/api"
import { ThemeToggle } from "../theme-toggle"
import { UserAvatar } from "../user-avatar"

export function SiteHeader() {
  const { isPending, error, data } = useQuery(userQueryOptions)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center w-full gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <SearchForm className="flex-1 max-w-xs" />
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          {isPending ? (
            <Skeleton className="w-8 h-8 rounded-full" />
          ) : (
            <UserAvatar user={data?.user} />
          )}
        </div>
      </div>
    </header>
  )
}
