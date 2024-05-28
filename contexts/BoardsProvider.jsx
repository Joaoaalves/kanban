import { createContext, useEffect, useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBoards,
  createBoard,
  updateBoard,
  updateBoardColumns,
} from "@/data/boards";
import { createTask } from "@/data/tasks";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: boards } = useQuery({
    queryFn: getBoards,
    queryKey: ["boards"],
  });

  const { mutateAsync: createBoardFn } = useMutation({
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

  const { mutateAsync: createTaskFn } = useMutation({
    mutationFn: async ({ task, boardId }) => {
      const { response } = await createTask(task, boardId);
      return { response, boardId };
    },
    onSuccess: ({ response, boardId }) => {
      const { task } = response;
      queryClient.setQueryData(["boards"], (boards) => {
        return boards.map((board) => {
          if (board._id === boardId) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column._id === task.status) {
                  return {
                    ...column,
                    tasks: [...column.tasks, task],
                  };
                }
                return column;
              }),
            };
          }
          return board;
        });
      });
    },
  });

  const handleMoveTask = async (source, destination) => {
    if (!destination) return;

    // Encontrar o board que contém a coluna de origem
    const board = boards.find((board) =>
      board.columns.some((col) => col._id === source.droppableId),
    );

    if (!board) return;

    // Encontrar a coluna de origem e destino
    const sourceColumn = board.columns.find(
      (col) => col._id === source.droppableId,
    );
    const destinationColumn = board.columns.find(
      (col) => col._id === destination.droppableId,
    );

    if (sourceColumn && destinationColumn) {
      const sourceTasks = [...sourceColumn.tasks];
      const [movedTask] = sourceTasks.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        // Movendo dentro da mesma coluna
        sourceTasks.splice(destination.index, 0, movedTask);
        await updateBoardColumns({
          boardId: board._id,
          columns: board.columns.map((col) =>
            col._id === sourceColumn._id ? { ...col, tasks: sourceTasks } : col,
          ),
        });

        // Atualizar o cache do React Query
        queryClient.setQueryData(["boards"], (oldData) =>
          oldData.map((b) =>
            b._id === board._id
              ? {
                  ...b,
                  columns: b.columns.map((col) =>
                    col._id === sourceColumn._id
                      ? { ...col, tasks: sourceTasks }
                      : col,
                  ),
                }
              : b,
          ),
        );
      } else {
        // Movendo entre colunas diferentes
        const destinationTasks = [...destinationColumn.tasks];
        destinationTasks.splice(destination.index, 0, movedTask);

        await updateBoardColumns({
          boardId: board._id,
          columns: board.columns.map((col) =>
            col._id === sourceColumn._id
              ? { ...col, tasks: sourceTasks }
              : col._id === destinationColumn._id
                ? { ...col, tasks: destinationTasks }
                : col,
          ),
        });

        // Atualizar o cache do React Query
        queryClient.setQueryData(["boards"], (oldData) =>
          oldData.map((b) =>
            b._id === board._id
              ? {
                  ...b,
                  columns: b.columns.map((col) =>
                    col._id === sourceColumn._id
                      ? { ...col, tasks: sourceTasks }
                      : col._id === destinationColumn._id
                        ? { ...col, tasks: destinationTasks }
                        : col,
                  ),
                }
              : b,
          ),
        );
      }
    }
  };

  const getBoard = (boardId) => {
    return boards?.find((board) => board._id === boardId);
  };

  const handleCreateBoard = async (board) => {
    try {
      await createBoardFn({ board });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTask = async (task, boardId) => {
    try {
      await createTaskFn({ task, boardId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BoardsContext.Provider
      value={{
        boards,
        handleCreateBoard,
        getBoard,
        handleCreateTask,
        handleMoveTask,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoards = () => useContext(BoardsContext);
