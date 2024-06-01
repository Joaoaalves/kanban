import { useMutation } from "@tanstack/react-query";
import { createColumn } from "@/data/boards";


const useCreateColumn = (queryClient) => {
    return useMutation({
      mutationFn: async ({ column, boardId }) => {
        const createdColumn = await createColumn(column, boardId);
        return { createdColumn, boardId };
      },
      onSuccess: ({ createdColumn, boardId }) => {
        if (!createdColumn) return;
  
        queryClient.setQueryData(["board", boardId], (oldBoard) => {
          return {
            ...oldBoard,
            columns: [...oldBoard.columns, createdColumn],
          };
        });
      },
    });
  };

export default useCreateColumn;