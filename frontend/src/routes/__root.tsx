import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { Toaster } from "sonner"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/Header/site-header"
import { AppSidebar } from "@/components/Sidebar/sidebar"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root
})

function Root() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex flex-col flex-1 gap-4 p-4">
            <Outlet />
            <Toaster />
          </div>
        </div>
      </SidebarProvider>

      {/* Uncomment the line below to enable the devtools */}
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  )
}
