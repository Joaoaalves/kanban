import { useState } from "react";
import { object, string } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useBoards } from "@/contexts/BoardsProvider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NewTaskForm({ children, board }) {
  const { getBoard, handleCreateTask } = useBoards();
  const [open, setOpen] = useState(false);
  const columnIds = board ? board.columns.map((column) => column._id) : [];

  const boardSchema = object({
    title: string().min(3),
    description: string().min(10),
    status: string().refine((value) => columnIds.includes(value), {
      message: "Invalid status ID",
    }),
    subTasks: object({
      title: string().min(3),
    }).array(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: columnIds.length > 0 ? columnIds[0] : "",
      subTasks: [{ id: uuidv4(), title: "" }],
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
    await handleCreateTask(data, board._id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!bg-light-bg dark:!bg-dark-grey">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col w-full gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset>
            <label
              htmlFor="task-title"
              className="text-medium-grey text-xs font-bold dark:text-white mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="task-title"
              className="w-full border-medium-grey/25 border-2 px-4 py-2 rounded bg-transparent"
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
              className="text-medium-grey text-xs font-bold dark:text-white mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="task-description"
              className="w-full border-medium-grey/25 border-2 px-4 py-2 rounded bg-transparent"
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
              className="text-medium-grey text-xs font-bold dark:text-white mb-2"
            >
              Subtasks
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="w-full flex items-center justify-between mb-3"
              >
                <input
                  type="text"
                  className="w-full border-medium-grey/25 border-2 px-4 py-2 rounded bg-transparent"
                  placeholder="e.g. Make coffee"
                  {...register(`subTasks.${index}.title`, { required: true })}
                />
                <button type="button" onClick={() => removeSubtask(index)}>
                  <FaTimes className="text-medium-grey hover:text-red text-lg ms-4 transition-all duration-300" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubtask}
              className="py-2 rounded-full w-full bg-light-purple/10 text-purple hover:bg-purple hover:text-white dark:bg-light-bg transition-all duration-300 font-bold"
            >
              + Add New Subtask
            </button>
          </fieldset>

          <fieldset>
            <label
              htmlFor="task-status"
              className="text-medium-grey text-xs font-bold dark:text-white mb-2"
            >
              Status
            </label>
            <select
              id="task-status"
              className="w-full border-medium-grey/25 border-2 px-4 py-2 rounded bg-transparent"
              {...register("status", { required: true })}
            >
              {board &&
                board.columns &&
                board.columns.map((column) => (
                  <option value={column._id} key={`status-${column._id}`}>
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
              className="py-2 rounded-full w-full bg-purple text-white hover:bg-light-purple hover:text-white transition-all duration-300 font-bold"
              value="Create New Task"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
