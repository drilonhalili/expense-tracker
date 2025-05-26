import { createFileRoute } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/create-expense")({
  component: Expenses
})

function Expenses() {
  return (
    <div className="p-2">
      <h2>Create expense</h2>
      <form>
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Title" />
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" placeholder="Amount" />
        <Button className="mt-4" type="submit" className="mt-2">Create Expense</Button>
      </form>
    </div>
  )
}
