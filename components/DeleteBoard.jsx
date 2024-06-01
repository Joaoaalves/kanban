import { useBoards } from "@/contexts/BoardsProvider";
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

export default function DeleteBoard({ children, board, open, setOpen }) {
  const router = useRouter();
  const { handleDeleteBoard } = useBoards();

  const handleDelete = async () => {
    handleDeleteBoard(board._id);
    router.push("/boards");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
        <DialogHeader>
          <DialogTitle className="text-red heading-l">
            Delete this board?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="body-l text-medium-grey">
          Are you sure you want to delete the ‘{board.name}’ board? This action
          will remove all columns and tasks and cannot be reversed.
        </DialogDescription>
        <DialogFooter>
          <div className="w-full flex items-center justify-center gap-x-4">
            <button
              type="submit"
              className="py-2 rounded-full w-full bg-red text-white hover:bg-light-red transition-all duration-300 font-bold"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="py-2 rounded-full w-full bg-light-purple/10 text-purple dark:bg-white hover:bg-purple hover:text-white transition-all duration-300 font-bold"
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
