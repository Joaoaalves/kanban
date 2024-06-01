import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import EditColumnForm from "./EditColumnForm";
  
  export default function NewColumn({ children, column}) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
          <DialogHeader>
            <DialogTitle>Edit {column.name}</DialogTitle>
          </DialogHeader>
          <EditColumnForm column={column}/>
        </DialogContent>
      </Dialog>
    );
  }
  