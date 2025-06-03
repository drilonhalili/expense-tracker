import { createFileRoute } from "@tanstack/react-router"
import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions
} from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { ExpenseDeleteButton } from "@/components/DeleteButton/ExpenseDeleteButton"
import { Skeleton } from "@/components/ui/skeleton"

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses
})

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions)
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  )

  if (error) return "An error has occurred: " + error.message

  return (
    <Table>
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loadingCreateExpense?.expense && (
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4" />
            </TableCell>
            <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
            <TableCell className="text-right">
              {loadingCreateExpense?.expense.amount}
            </TableCell>
            <TableCell className="text-right">
              {loadingCreateExpense?.expense.date}
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4" />
            </TableCell>
          </TableRow>
        )}
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4" />
                </TableCell>
              </TableRow>
            ))
          : data?.expenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell className="text-right">{expense.amount}</TableCell>
                <TableCell className="text-right">{expense.date}</TableCell>
                <TableCell className="text-right">
                  <ExpenseDeleteButton id={expense.id} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}
