import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  Outlet
} from "@tanstack/react-router"
import { Toaster } from "sonner"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import Header from "@/components/Header/Header"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root
})

function Root() {
  return (
    <div className="flex flex-col h-screen max-w-[1600px] mx-auto">
      {/* <Header /> */}
      <hr />
      <Outlet />
      <Toaster />
      {/* Uncomment the line below to enable the devtools */}
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  )
}
