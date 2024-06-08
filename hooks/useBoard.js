import { useMutation, useQuery } from "@tanstack/react-query";
import { getBoardById, editBoard as editBoardApi, createColumn as createColumnApi } from "@/data/boards";
import { useQueryClient } from "@tanstack/react-query";

export default function useBoard({ boardId }) {
    const queryClient = useQueryClient();

    const { data: board } = useQuery({
        queryKey: ["board", boardId],
        queryFn: async () => {
            const data = await getBoardById(boardId)

            data.columns.map(column => {
                queryClient.setQueryData(["column", column._id], column)
                column.tasks.map(task => {
                    queryClient.setQueryData(["task", task._id], task)
                    task.subTasks.map(subTask => queryClient.setQueryData(["subTask", subTask._id], subTask))
                })
            })

            return data
        },
        enabled: !!boardId,
    });

    const editBoard = useMutation({
        mutationFn: async (board) => {
            await editBoardApi(board);
            return board;
        },
        onSuccess: (updatedBoard) => {
            queryClient.setQueryData(["board", boardId], updatedBoard);
        },
    });

    const createColumn = useMutation({
        mutationFn: async (column) => {
            const createdColumn = await createColumnApi(column);
            return createdColumn;
        },
        onSuccess: (createdColumn) => {
            if (!createdColumn) return;

            queryClient.setQueryData(["board", boardId], (oldBoard) => {
                return {
                    ...oldBoard,
                    columns: [...oldBoard.columns, createdColumn._id],
                };
            });

            queryClient.setQueryData(["column", createdColumn._id], createdColumn);
        },
    });

    return { board, editBoard: editBoard.mutateAsync, createColumn: createColumn.mutateAsync };
}