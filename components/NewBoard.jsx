"use client";
import { useState } from "react";
import { object, string } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import useBoards from "@/hooks/useBoards";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NewBoard({ children }) {
  const {newBoard} = useBoards()
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState([{ id: uuidv4(), name: "" }]);

  const boardSchema = object({
    name: string().min(3),
    columns: object({
      name: string().min(3),
    }).array(),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      columns: columns,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const addColumn = () => {
    append({ id: uuidv4(), name: "" });
  };

  const removeColumn = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {
    await newBoard(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
        </DialogHeader>
        <form
          className="flex w-full flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset>
            <label
              htmlFor="board-name"
              className="mb-2 text-xs font-bold text-medium-grey dark:text-white"
            >
              Board Name
            </label>
            <input
              type="text"
              id="board-name"
              className="w-full rounded border-2 border-medium-grey/25 bg-transparent px-4 py-2"
              placeholder="e.g. Web Design"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Board name is required</span>
            )}
          </fieldset>

          <fieldset>
            <label
              htmlFor="board-columns"
              className="mb-2 text-xs font-bold text-medium-grey dark:text-white"
            >
              Board Columns
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-3 flex w-full items-center justify-between"
              >
                <input
                  type="text"
                  className="w-full rounded border-2 border-medium-grey/25 bg-transparent px-4 py-2"
                  placeholder="e.g. Todo"
                  {...register(`columns.${index}.name`, { required: true })}
                />
                <button type="button" onClick={() => removeColumn(index)}>
                  <FaTimes className="ms-4 text-lg text-medium-grey transition-all duration-300 hover:text-red" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addColumn}
              className="w-full rounded-full bg-light-purple/10 py-2 font-bold text-purple transition-all duration-300 hover:bg-purple hover:text-white dark:bg-light-bg"
            >
              + Add New Column
            </button>
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
