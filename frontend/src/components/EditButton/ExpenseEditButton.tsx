import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditExpenseForm } from "./EditExpenseForm"

export function ExpenseEditButton({
  expense,
  open,
  setOpen
}: {
  expense: any
  open: boolean
  setOpen: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <EditExpenseForm expense={expense} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
