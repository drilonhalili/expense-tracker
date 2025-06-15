import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/data')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/data"!</div>
}
