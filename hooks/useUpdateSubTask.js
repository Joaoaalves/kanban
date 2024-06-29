import { useMutation } from "@tanstack/react-query";
import { updateSubTask } from "@/data/subTask";

const useUpdateSubTask = (queryClient) => {
  return useMutation({
    mutationFn: async ({ subTaskId, isCompleted }) => {
      const updatedSubtask = await updateSubTask({ subTaskId, isCompleted });
      return { updatedSubtask };
    },
    onSuccess: ({ updatedSubtask, subTaskId }) => {
      if (!updatedSubtask) return;
      queryClient.setQueryData(
        ["activeBoard", "665c8621bdc9ec86cf06dcd1"],
        (oldBoard) => {
          return {
            ...oldBoard,
            columns: oldBoard.columns.map((col) => {
              return {
                ...col,
                tasks: col.tasks.map((task) => {
                  return {
                    ...task,
                    subTasks: task.subTask.map((sub) => {
                      if (sub._id === subTaskId) {
                        return updateSubTask;
                      }
                      return sub;
                    }),
                  };
                }),
              };
            }),
          };
        },
      );
    },
  });
};

export default useUpdateSubTask;
