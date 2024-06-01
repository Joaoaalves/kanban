import { useMutation } from "@tanstack/react-query";
import { createBoard } from "@/data/boards";

const useCreateBoard = (queryClient) => {
    return useMutation({
      mutationFn: async ({ board }) => {
        const createdBoard = await createBoard(board);
        return { createdBoard };
      },
      onSuccess: ({ createdBoard }) => {
        queryClient.setQueryData(["boards"], (data) => {
          return [...data, createdBoard];
        });
      },
    });
  };

export default useCreateBoard;