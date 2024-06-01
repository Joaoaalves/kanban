import { getBoards } from "@/data/boards";
import { useQuery } from "@tanstack/react-query";

const useFetchBoards = () => {
    return useQuery({
      queryFn: getBoards,
      queryKey: ["boards"],
    });
};

export default useFetchBoards;