import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/income')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/income"!</div>
}
