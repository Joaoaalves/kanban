import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask as deleteTaskAPI } from "@/data/tasks";

export default function useTask(taskId) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: () => deleteTaskAPI(taskId),
    onSuccess: () => queryClient.setQueryData(["task", taskId], null),
  });

  const { data: task } = useQuery({
    queryFn: () => queryClient.getQueryData(["task", taskId]),
    queryKey: ["task", taskId],
    enabled: !!taskId,
  });

  const totalSubtasksCompleted = () => {
    return (
      task?.subTasks.filter((sub) => queryClient.getQueryData(["subTask", sub._id])?.isCompleted).length || 0
    );
  };

  return { task, totalSubtasksCompleted, deleteTask };
}