import { useState } from "react";
import { object, string } from "zod";
import { useForm } from "react-hook-form";
import { useBoards } from "@/contexts/BoardsProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";

export default function NewBoardForm({ children, boardId }) {
  const { handleCreateColumn } = useBoards();
  const [open, setOpen] = useState(false);

  const columnSchema = object({
    name: string().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    await handleCreateColumn(data, boardId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col w-full gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset>
            <label
              htmlFor="column-name"
              className="text-medium-grey text-xs font-bold dark:text-white mb-2"
            >
              Column Name
            </label>
            <input
              type="text"
              id="column-name"
              className="w-full border-medium-grey/25 border-2 px-4 py-2 rounded bg-transparent"
              placeholder="e.g. Web Design"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Column name is required</span>
            )}
          </fieldset>
          <DialogFooter>
            <input
              type="submit"
              className="py-2 rounded-full w-full bg-purple text-white hover:bg-light-purple hover:text-white transition-all duration-300 font-bold"
              value={"Create New Board"}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
