import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewColumnForm from "./NewColumnForm";

export default function NewColumn({ children, boardId, column }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <NewColumnForm boardId={boardId} column={column}/>
      </DialogContent>
    </Dialog>
  );
}
