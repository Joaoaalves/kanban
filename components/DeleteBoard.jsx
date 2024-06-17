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
import useBoards from "@/hooks/useBoards";

export default function DeleteBoard({ children, board, open, setOpen }) {
  const router = useRouter();
  const { deleteBoard } = useBoards();

  const handleDelete = async () => {
    deleteBoard(board._id);
    setOpen(false);
    router.push("/boards");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[80vw] rounded-lg !bg-light-bg px-4 dark:!bg-dark-grey sm:px-6">
        <DialogHeader>
          <DialogTitle className="heading-l text-red">
            Delete this board?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="body-l text-medium-grey">
          Are you sure you want to delete the ‘{board.name}’ board? This action
          will remove all columns and tasks and cannot be reversed.
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
