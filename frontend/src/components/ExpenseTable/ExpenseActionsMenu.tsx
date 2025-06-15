import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, Copy } from "lucide-react"
import { useState } from "react"
import { ExpenseEditButton } from "@/components/EditButton/ExpenseEditButton"
import { toast } from "sonner"

export function ExpenseActionsMenu({ expense, onDelete, onCopy }: {
  expense: any
  onDelete: (id: number) => void
  onCopy: (expense: any) => void
}) {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open actions">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 w-4 h-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(expense.id)}>
            <Trash2 className="mr-2 w-4 h-4 text-red-500" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(expense)}>
            <Copy className="mr-2 w-4 h-4" /> Copy
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ExpenseEditButton
        expense={expense}
        open={editOpen}
        setOpen={setEditOpen}
      />
    </>
  )
}
