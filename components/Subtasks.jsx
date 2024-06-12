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

function SubTask({ subTaskId }) {
  "use client"
    const {subTask, updateSubTask} = useSubTask(subTaskId)
  return (
    <div
      className={`flex w-full items-center justify-start gap-x-4 p-3 rounded ${subTask.isCompleted ? "bg-medium-grey/10 dark:bg-dark-bg !line-through" : "bg-[#d8d7f1] dark:bg-[#39395b]"}`}
    >
      <input
        type="checkbox"
        name={`subTask-${subTask._id}`}
        checked={subTask.isCompleted}
        onChange={() => updateSubTask( !subTask.isCompleted)}
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
