import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import {useBoard} from "@/contexts/BoardProvider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditTask({ task, open, setOpen }) {
  const { board, editTask } = useBoard();
  const columnIds = board ? board.columns.map((column) => column._id) : [];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: columnIds.length > 0 ? columnIds[0] : "",
      subTasks: task.subTasks.map(sub => ({...sub}))
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks",
  });

  const addSubtask = () => {
    append({ id: uuidv4(), title: "" });
  };

  const removeSubtask = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {
    await editTask({
        _id: task._id,
        ...data
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form
          className="flex w-full flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset>
            <label
              htmlFor="task-title"
              className="mb-2 text-xs font-bold text-medium-grey dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="task-title"
              className="w-full rounded border-2 border-medium-grey/25 bg-transparent px-4 py-2"
              placeholder="e.g. Take coffee break"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Task title is required</span>
            )}
          </fieldset>
          <fieldset>
            <label
              htmlFor="task-description"
              className="mb-2 text-xs font-bold text-medium-grey dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="task-description"
              className="w-full rounded border-2 border-medium-grey/25 bg-transparent px-4 py-2"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500">Task description is required</span>
            )}
          </fieldset>

          <fieldset>
            <label
              htmlFor="task-subtasks"
              className="mb-2 text-xs font-bold text-medium-grey dark:text-white"
            >
              Subtasks
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-3 flex w-full items-center justify-between"
              >
                <input
                  type="text"
                  className="w-full rounded border-2 border-medium-grey/25 bg-transparent px-4 py-2"
                  placeholder="e.g. Make coffee"
                  {...register(`subTasks.${index}.title`, { required: true })}
                />
                <button type="button" onClick={() => removeSubtask(index)}>
                  <FaTimes className="ms-4 text-lg text-medium-grey transition-all duration-300 hover:text-red" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubtask}
              className="w-full rounded-full bg-light-purple/10 py-2 font-bold text-purple transition-all duration-300 hover:bg-purple hover:text-white dark:bg-light-bg"
            >
              + Add New Subtask
            </button>
          </fieldset>

          <fieldset>
            <label
              htmlFor="task-status"
              className="mb-2 text-xs font-bold text-medium-grey dark:text-white"
            >
              Status
            </label>

            <select
              id="task-status"
              className="w-full rounded border-2 border-medium-grey/25 bg-transparent px-4 py-2"
              {...register("status", { required: true })}
            >
              {board &&
                board.columns &&
                board.columns.map((column) => (
                  <option className="bg-light-bg dark:bg-dark-bg" value={column._id} key={`status-${column._id}`}>
                    {column.name}
                  </option>
                ))}
            </select>
            {errors.status && (
              <span className="text-red-500">Task status is required</span>
            )}
          </fieldset>
          <DialogFooter>
            <input
              type="submit"
              className="w-full rounded-full bg-purple py-2 font-bold text-white transition-all duration-300 hover:bg-light-purple hover:text-white"
              value="Save Task"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
