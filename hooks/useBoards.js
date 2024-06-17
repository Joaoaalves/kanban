import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBoards } from "@/data/boards";
import { createBoard, deleteBoard as deleteBoardApi } from "@/data/boards";

export default function useBoards() {
  const queryClient = useQueryClient();

  const { data: boards } = useQuery({
    queryFn: getBoards,
    queryKey: ["boards"],
  });

  const { mutateAsync: newBoard } = useMutation({
    mutationFn: async (board) => {
      const createdBoard = await createBoard(board);
      return { createdBoard };
    },
    onSuccess: ({ createdBoard }) => {
      queryClient.setQueryData(["boards"], (data) => {
        return [...data, createdBoard];
      });
    },
  });

  const { mutateAsync: deleteBoard } = useMutation({
    mutationFn: async (boardId) => {
      await deleteBoardApi(boardId);
      return { boardId };
    },
    onSuccess: ({ boardId }) => {
      queryClient.setQueryData(["boards"], (data) => {
        return data.filter((board) => board._id !== boardId);
      });
      queryClient.setQueryData(["board", boardId], {});
    },
  });

  return { boards, newBoard, deleteBoard };
}
