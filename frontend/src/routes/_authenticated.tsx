import { Outlet, redirect, useNavigate } from "@tanstack/react-router"
import { createFileRoute } from "@tanstack/react-router"
import { userQueryOptions } from "@/lib/api"
import { SiteHeader } from "@/components/Header/SiteHeader"
import { AppSidebar } from "@/components/Sidebar/Sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Component = () => {
  const { user } = Route.useRouteContext()
  const navigate = useNavigate()

  if (!user) {
    // Optional: if you want immediate redirect instead of blank state
    navigate({ to: "/login", replace: true })
    return null
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col flex-1">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient

    try {
      const user = await queryClient.fetchQuery(userQueryOptions)

      // If user is not found, redirect to /login
      if (!user) {
        throw redirect({ to: "/login" })
      }

      return { user }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      throw redirect({ to: "/login" })
    }
  },
  component: Component
})
