import { createFileRoute } from "@tanstack/react-router"
import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
  createExpense
} from "@/lib/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { ExpenseForm } from "@/components/ExpenseForm/ExpenseForm"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ExpenseEditButton } from "@/components/EditButton/ExpenseEditButton"
import { ExpenseDeleteButton } from "@/components/DeleteButton/ExpenseDeleteButton"

const locationTabs = [
  { value: "", label: "All" },
  { value: "butel", label: "Butel" },
  { value: "kisella-voda", label: "Kisella Voda" },
  { value: "chair", label: "Chair" },
  { value: "stadion", label: "Stadion" },
  { value: "emka", label: "Emka" }
]

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses
})

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions)
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  )
  const [selectedLocation, setSelectedLocation] = useState("")
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const filteredExpenses = useMemo(() => {
    if (!data?.expenses) return []
    if (!selectedLocation) return data.expenses
    return data.expenses.filter(e => e.location === selectedLocation)
  }, [data, selectedLocation])

  async function handleCreateExpense(value: any) {
    const existingExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions)
    queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, { expense: value })
    try {
      const newExpense = await createExpense({ value })
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses]
      })
      toast.success(`Expense "${newExpense.category}" created successfully!`)
      setOpen(false)
    } catch (error) {
      toast.error("Failed to create expense. Please try again.")
    } finally {
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {})
    }
  }

  const locationLabels: Record<string, string> = {
    "butel": "Butel",
    "kisella-voda": "Kisella Voda",
    "chair": "Chair",
    "stadion": "Stadion",
    "emka": "Emka"
  }

  if (error) return "An error has occurred: " + error.message

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {/* Tabs */}
        <div className="flex gap-2">
          {locationTabs.map(tab => (
            <Button
              key={tab.value}
              variant={selectedLocation === tab.value ? "default" : "outline"}
              onClick={() => setSelectedLocation(tab.value)}
              size="sm"
            >
              {tab.label}
            </Button>
          ))}
        </div>
        {/* Add Expense Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Add Expense</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Expense</DialogTitle>
            </DialogHeader>
            <ExpenseForm
              defaultValues={{
                date: new Date().toISOString(),
                location: "",
                category: "",
                amount: "0"
              }}
              onSubmit={handleCreateExpense}
              submitLabel="Create Expense"
            />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          )}
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={7}>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            : filteredExpenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    {locationLabels[expense.location] || expense.location}
                  </TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                  <TableCell className="text-right">
                    <ExpenseEditButton expense={expense} />
                  </TableCell>
                  <TableCell className="text-right">
                    <ExpenseDeleteButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
