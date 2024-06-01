import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "@/data/boards";

const useFetchActiveBoard = (boardId) => {
    return useQuery({
      queryFn: () => getBoardById(boardId),
      queryKey: ["board", boardId],
      enabled: !!boardId,
    });
};

export default useFetchActiveBoard;