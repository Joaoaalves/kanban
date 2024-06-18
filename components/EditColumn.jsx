import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { object, string } from "zod";
import { useForm } from "react-hook-form";
import useColumn from "@/hooks/useColumn";
import toast from "@/lib/toast.";

export default function EditColumn({ children, columnId }) {
  const [open, setOpen] = useState(false);
  const { column, editColumn } = useColumn(columnId);

  if (!column) return;

  const columnSchema = object({
    name: string().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: column._id,
      name: column.name,
    },
  });

  const onSubmit = async (data) => {
    await editColumn(data);
    setOpen(false);
    toast({
      title: "Changes Saved!",
      description: `The changes to ${data.name} was saved successfully!`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[80vw] md:max-w-[600px] rounded-lg !bg-light-bg px-4 dark:!bg-dark-grey sm:px-6">
        <DialogHeader>
          <DialogTitle>Edit {column.name}</DialogTitle>
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
              value={"Save Board"}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
