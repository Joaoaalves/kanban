import { useBoard } from "@/contexts/BoardProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import useTask from "@/hooks/useTask";

export default function DeleteTask({ children, task, open, setOpen }) {
  const router = useRouter();
  const {deleteTask} = useTask(task._id)

  const handleDelete = async () => {
    await deleteTask()
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
        <DialogHeader>
          <DialogTitle className="heading-l text-red">
            Delete this task?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="body-l text-medium-grey">
          Are you sure you want to delete the ‘{task.title}’ task? This action
          will remove all subtasks and cannot be reversed.
        </DialogDescription>
        <DialogFooter>
          <div className="flex w-full items-center justify-center gap-x-4">
            <button
              type="submit"
              className="w-full rounded-full bg-red py-2 font-bold text-white transition-all duration-300 hover:bg-light-red"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="w-full rounded-full bg-light-purple/10 py-2 font-bold text-purple transition-all duration-300 hover:bg-purple hover:text-white dark:bg-white"
              type="submit"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}