import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "@/data/boards";

const useFetchActiveBoard = (boardId) => {
  return useQuery({
    queryFn: () => getBoardById(boardId),
    queryKey: ["activeBoard", boardId],
    enabled: !!boardId,
  });
};

export default useFetchActiveBoard;
