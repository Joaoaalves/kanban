import { createContext, useContext } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  getBoardById,
  editBoard as editBoardApi,
  createColumn as createColumnApi,
} from "@/data/boards";
import { createTask as createTaskApi } from "@/data/tasks";
import { editTask as editTaskApi } from "@/data/tasks";
export const BoardContext = createContext();
import { moveTask, moveColumn } from "@/lib/kanban";

export const BoardProvider = ({ children, boardId }) => {
  if (!boardId) return null;

  const queryClient = useQueryClient();

  const { data: board } = useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const data = await getBoardById(boardId);

      data.columns.forEach((column) => {
        queryClient.setQueryData(["column", column._id], column);
        column.tasks.forEach((task) => {
          queryClient.setQueryData(["task", task._id], task);
          task.subTasks.forEach((subTask) =>
            queryClient.setQueryData(["subTask", subTask._id], subTask),
          );
        });
      });

      return data;
    },
    enabled: !!boardId,
  });

  const { mutateAsync: editBoard } = useMutation({
    mutationFn: async (board) => await editBoardApi(board),
    onSuccess: (updatedBoard) => {
      queryClient.setQueryData(["board", updatedBoard._id], updatedBoard);
      updatedBoard.columns.map((column) =>
        queryClient.setQueryData(["column", column._id], column),
      );
    },
  });

    const { mutateAsync: createColumn } = useMutation({
      mutationFn: async (column) => await createColumnApi(column, boardId),
      onSuccess: (createdColumn) => {
        queryClient.setQueryData(["board", boardId], (oldBoard) => ({
          ...oldBoard,
          columns: [...oldBoard.columns, createdColumn],
        }));
        queryClient.setQueryData(["column", createdColumn._id], createdColumn);
      },
    });
  
    const { mutateAsync: createTask } = useMutation({
      mutationFn: async (task) => {
        const newTask = await createTaskApi(task, boardId);
        return { newTask, columnId: task.status };
      },
      onSuccess: ({ newTask, columnId }) => {
        queryClient.setQueryData(["column", columnId], (oldColumn) => ({
          ...oldColumn,
          tasks: [...oldColumn.tasks, newTask],
        }));
        queryClient.setQueryData(["task", newTask._id], newTask);
        newTask.subTasks.forEach(sub => queryClient.setQueryData(["subTask", sub._id], sub));
      },
    });

    const {mutateAsync: editTask} = useMutation({
      mutationFn: async (task) => await editTaskApi(task),
      onSuccess: (task) => {
        queryClient.setQueryData(["task", task._id], task)
      }
    })
  
    const handleMoveTask = (source, destination) => moveTask(source, destination, queryClient);
    const handleMoveColumn = (source, destination) => moveColumn(source, destination, board._id, queryClient);
  
    return (
      <BoardContext.Provider
        value={{
          board,
          editBoard,
          createColumn,
          handleMoveTask,
          handleMoveColumn,
          createTask,
          editTask
        }}
      >
        {children}
      </BoardContext.Provider>
    );
  };
  
  export const useBoard = () => useContext(BoardContext);