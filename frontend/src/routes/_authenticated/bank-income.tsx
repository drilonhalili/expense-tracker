import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/bank-income')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/bank-income"!</div>
}
