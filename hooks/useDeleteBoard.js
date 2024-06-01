import { useMutation } from "@tanstack/react-query";
import { deleteBoard } from "@/data/boards";

const useDeleteBoard = (queryClient) => {
  return useMutation({
    mutationFn: async ({ boardId }) => {
      await deleteBoard(boardId);
      return { boardId };
    },
    onSuccess: ({ boardId }) => {
      queryClient.setQueryData(["boards"], (data) => {
        return data.filter((board) => board._id !== boardId);
      });
      queryClient.setQueryData(["board", boardId], {});
    },
  });
};

export default useDeleteBoard;
