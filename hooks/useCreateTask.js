import { useMutation } from "@tanstack/react-query";
import { createTask } from "@/data/tasks";

const useCreateTask = (queryClient) => {
    return useMutation({
      mutationFn: async ({ task, boardId }) => {
        const { task : newTask}  = await createTask(task, boardId);
        return { boardId, newTask };
      },
      onSuccess: ({ boardId, newTask: task }) => {
        
        queryClient.setQueryData(["board", boardId], (oldBoard) => {
          return {
            ...oldBoard,
            columns: oldBoard.columns.map((column) => {
              if (column._id === task.status) {
                return {
                  ...column,
                  tasks: [...column.tasks, task],
                };
              }
              return column;
            }),
          };
        });
      },
    });
};

export default useCreateTask;