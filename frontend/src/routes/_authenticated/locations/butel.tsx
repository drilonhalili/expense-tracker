import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/locations/butel')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/locations/butel"!</div>
}
