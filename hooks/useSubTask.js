import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateSubTask as updateSubTaskApi } from "@/data/subTask";

export default function useSubTask(subTaskId) {
  const queryClient = useQueryClient();

  const { data: subTask } = useQuery({
    queryFn: () => queryClient.getQueryData(["subTask", subTaskId]),
    queryKey: ["subTask", subTaskId],
    enabled: !!subTaskId,
  });

  const { mutateAsync: updateSubTask } = useMutation({
    mutationFn: async (isCompleted) => await updateSubTaskApi({ subTaskId, isCompleted }),
    onSuccess: (updatedSubtask) => {
      queryClient.setQueryData(["subTask", updatedSubtask._id], updatedSubtask);
      queryClient.invalidateQueries(["task"]);
    },
  });

  return { subTask, updateSubTask };
}