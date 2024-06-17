import useSubTask from "@/hooks/useSubTask";

export default function SubTasks({ totalSubtasksCompleted, subtasks }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-start gap-y-2">
      <h4 className="mb-2 text-xs font-bold text-medium-grey">
        Subtasks ({totalSubtasksCompleted()} of {subtasks?.length})
      </h4>
      {subtasks &&
        subtasks.map((subtask) => (
          <SubTask subTaskId={subtask?._id || subtask} key={subtask._id} />
        ))}
    </div>
  );
}

import toast from "@/lib/toast.";

function SubTask({ subTaskId }) {
  "use client";
  const { subTask, updateSubTask } = useSubTask(subTaskId);

  const handleToggleSubtask = () => {
    updateSubTask(!subTask.isCompleted);
    toast({
      title: "Subtask updated!",
      description: `Subtask was marked as ${!subTask.isCompleted ? '"Done"' : '"To Do"'}.`,
    });
  };
  return (
    <div
      className={`group flex w-full cursor-pointer items-center justify-start gap-x-4 rounded p-3 ${subTask.isCompleted ? "bg-medium-grey/10 !line-through dark:bg-dark-bg" : "bg-[#d8d7f1] dark:bg-[#39395b]"}`}
      onClick={handleToggleSubtask}
    >
      <input
        type="checkbox"
        name={`subTask-${subTask._id}`}
        checked={subTask.isCompleted}
        className={`transition-all duration-300`}
      />
      <label
        htmlFor={`subtask-${subTask._id}`}
        className={`text-xs font-bold text-black dark:text-white`}
      >
        {subTask.title}
      </label>
    </div>
  );
}
