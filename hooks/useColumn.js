import { updateColumn } from "@/data/boards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useColumn(columnId) {
  const queryClient = useQueryClient();

  const { data: column } = useQuery({
    queryFn: () => queryClient.getQueryData(["column", columnId]),
    queryKey: ["column", columnId],
    enabled: !!columnId,
  });

  const { mutateAsync: editColumn } = useMutation({
    mutationFn: async (column) => {
      const updatedColumn = await updateColumn(column);
      return updatedColumn;
    },
    onSuccess: (updatedColumn) => {
      queryClient.setQueryData(["column", updatedColumn._id], updatedColumn);
    },
  });

  return { column, editColumn };
}
