import { createFileRoute } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { AppSidebar } from "@/components/Sidebar/sidebar"
import { SiteHeader } from "@/components/Header/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Index
})

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get()
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await res.json()
  return data
}

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent
  })

  if (error) return "An error has occurred: " + error.message

  return (
    <SidebarInset>
      <div className="grid gap-4 auto-rows-min md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl">
          <Card className="h-full m-auto ">
            <CardHeader>
              <CardTitle>Total spent</CardTitle>
              <CardDescription>The total amount you've spent</CardDescription>
            </CardHeader>
            <CardContent>{isPending ? "..." : data.total}</CardContent>
          </Card>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </SidebarInset>
  )
}
