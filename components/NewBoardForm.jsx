import { useState } from "react";
import { object, string } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useBoards } from "@/contexts/BoardsProvider";

export default function NewBoardForm() {
  const { handleCreateBoard } = useBoards();
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
    handleCreateBoard(data);
  };

  return (
    <form
      className="flex flex-col w-full gap-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset>
        <label
          htmlFor="board-name"
          className="text-medium-grey text-xs font-bold dark:text-white mb-2"
        >
          Board Name
        </label>
        <input
          type="text"
          id="board-name"
          className="w-full border-medium-grey/25 border-2 px-4 py-2 rounded bg-transparent"
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
          className="text-medium-grey text-xs font-bold dark:text-white mb-2"
        >
          Board Columns
        </label>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full flex items-center justify-between mb-3"
          >
            <input
              type="text"
              className="w-full border-medium-grey/25 border-2 px-4 py-2 rounded bg-transparent"
              placeholder="e.g. Todo"
              {...register(`columns.${index}.name`, { required: true })}
            />
            <button type="button" onClick={() => removeColumn(index)}>
              <FaTimes className="text-medium-grey hover:text-red text-lg ms-4 transition-all duration-300" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addColumn}
          className="py-2 rounded-full w-full bg-light-purple/10 text-purple hover:bg-purple hover:text-white dark:bg-light-bg transition-all duration-300 font-bold"
        >
          + Add New Column
        </button>
      </fieldset>
      <input
        type="submit"
        className="py-2 rounded-full w-full bg-purple text-white hover:bg-light-purple hover:text-white transition-all duration-300 font-bold"
        value={"Create New Board"}
      />
    </form>
  );
}
