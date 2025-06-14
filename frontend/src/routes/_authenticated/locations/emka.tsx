import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/locations/emka')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/locations/emka"!</div>
}
