import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SidebarInset } from "@/components/ui/sidebar"

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Index,
})

async function getTotalSpent(): Promise<{ total: number }> {
  const res = await api.expenses["total-spent"].$get()
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await res.json()
  return { total: data.total ? Number(data.total) : 0 }
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  })

  if (error) return "An error has occurred: " + (error as Error).message

  return (
    <SidebarInset>
      <div className="grid gap-4 auto-rows-min md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl">
          <Card className="h-full m-auto">
            <CardHeader>
              <CardTitle>Total spent</CardTitle>
              <CardDescription>The total amount you've spent</CardDescription>
            </CardHeader>
            <CardContent>{isPending ? "..." : data?.total}</CardContent>
          </Card>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </SidebarInset>
  )
}
