import { useState } from "react";
import { object, string } from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { useBoard } from "@/contexts/BoardProvider";
import toast from "@/lib/toast.";
export default function NewBoardForm({ children }) {
  const { createColumn } = useBoard();
  const [open, setOpen] = useState(false);

  const columnSchema = object({
    name: string().min(3),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    await createColumn(data);
    reset();
    setOpen(false);
    toast({
      title: "Column created!",
      description: `The column "${data.name}" was created successfully.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[80vw] rounded-lg !bg-light-bg px-4 dark:!bg-dark-grey sm:px-6 md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <form
          className="flex w-full flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset>
            <label
              htmlFor="column-name"
              className="mb-2 text-xs font-bold text-medium-grey dark:text-white"
            >
              Column Name
            </label>
            <input
              type="text"
              id="column-name"
              className="w-full rounded border-2 border-medium-grey/25 bg-transparent px-4 py-2"
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
              className="w-full rounded-full bg-purple py-2 font-bold text-white transition-all duration-300 hover:bg-light-purple hover:text-white"
              value={"Create New Board"}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
