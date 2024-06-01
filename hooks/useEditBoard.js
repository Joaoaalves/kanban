import { useMutation } from "@tanstack/react-query";
import { editBoard } from "@/data/boards";

const useEditBoard = (queryClient) => {
  return useMutation({
    mutationFn: async ({ board }) => {
      await editBoard(board);
      return { board };
    },
    onSuccess: ({ board }) => {
      queryClient.setQueryData(["boards"], (data) => {
        return data.map((b) => {
          if (b._id === board._id) return board;
          return b;
        });
      });
      queryClient.setQueryData(["activeBoard", board._id], (data) => board);
    },
  });
};

export default useEditBoard;
