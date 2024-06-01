import { createContext, useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateColumn, updateBoardColumns } from "@/data/boards";
import {
  useFetchBoards,
  useFetchActiveBoard,
  useCreateBoard,
  useCreateColumn,
  useCreateTask,
  useEditBoard,
  useDeleteBoard,
} from "@/hooks";

export const BoardsContext = createContext();

const moveTask = async (source, destination, activeBoard, queryClient) => {
  if (!destination) return;

  const sourceColumn = activeBoard.columns.find(
    (col) => col._id === source.droppableId,
  );

  const destinationColumn = activeBoard.columns.find(
    (col) => col._id === destination.droppableId,
  );

  if (sourceColumn && destinationColumn) {
    const sourceTasks = [...sourceColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      updateActiveBoardLocally(queryClient, activeBoard, [
        { ...sourceColumn, tasks: sourceTasks },
      ]);

      await updateColumn({ ...sourceColumn, tasks: sourceTasks });
    } else {
      const destinationTasks = [...destinationColumn.tasks];
      destinationTasks.splice(destination.index, 0, movedTask);
      updateActiveBoardLocally(queryClient, activeBoard, [
        { ...sourceColumn, tasks: sourceTasks },
        { ...destinationColumn, tasks: destinationTasks },
      ]);

      await updateColumn({ ...sourceColumn, tasks: sourceTasks });
      await updateColumn({ ...destinationColumn, tasks: destinationTasks });
    }
  }
};

const moveColumn = async (source, destination, activeBoard, queryClient) => {
  if (!destination) return;

  const newColumns = Array.from(activeBoard.columns);
  const [movedColumn] = newColumns.splice(source.index, 1);
  newColumns.splice(destination.index, 0, movedColumn);

  updateActiveBoardLocally(queryClient, activeBoard, newColumns);
  await updateActiveBoardRemotely(activeBoard, newColumns);
};

const updateActiveBoardLocally = (queryClient, activeBoard, updatedColumns) => {
  queryClient.setQueryData(["activeBoard", activeBoard._id], (oldData) => ({
    ...oldData,
    columns: updatedColumns,
  }));
};

const updateActiveBoardRemotely = async (activeBoard, updatedColumns) => {
  try {
    await updateBoardColumns({
      boardId: activeBoard._id,
      columns: updatedColumns,
    });
  } catch (error) {
    console.error("Error updating the board remotely: ", error);
  }
};

export const BoardsProvider = ({ children, boardId }) => {
  const queryClient = useQueryClient();
  const { data: boards } = useFetchBoards();
  const { data: activeBoard, refetch: refetchActiveBoard } =
    useFetchActiveBoard(boardId);

  useEffect(() => {
    if (boardId) {
      refetchActiveBoard();
    }
  }, [boardId, refetchActiveBoard]);

  const { mutateAsync: createBoard } = useCreateBoard(queryClient);
  const { mutateAsync: createColumn } = useCreateColumn(queryClient);
  const { mutateAsync: createTask } = useCreateTask(queryClient);
  const { mutateAsync: editBoard } = useEditBoard(queryClient);
  const { mutateAsync: deleteBoard } = useDeleteBoard(queryClient);

  const handleMoveTask = (source, destination) =>
    moveTask(source, destination, activeBoard, queryClient);
  const handleMoveColumn = (source, destination) =>
    moveColumn(source, destination, activeBoard, queryClient);

  const handleCreateBoard = async (board) => {
    try {
      await createBoard({ board });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditBoard = async (board) => {
    try {
      await editBoard({ board });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard({ boardId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTask = async (task, boardId) => {
    try {
      await createTask({ task, boardId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateColumn = async (column, boardId) => {
    try {
      await createColumn({ column, boardId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateColumn = async (column) => {
    try {
      const editedColumn = await updateColumn(column);

      queryClient.setQueryData(["activeBoard", boardId], (oldBoard) => {
        if (!oldBoard) return oldBoard;

        const updatedColumns = oldBoard.columns.map((col) => {
          if (col._id === editedColumn._id) {
            return editedColumn;
          }
          return col;
        });

        return { ...oldBoard, columns: updatedColumns };
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BoardsContext.Provider
      value={{
        boards,
        activeBoard,
        handleCreateBoard,
        handleCreateTask,
        handleCreateColumn,
        handleMoveTask,
        handleUpdateColumn,
        handleMoveColumn,
        handleEditBoard,
        handleDeleteBoard,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoards = () => useContext(BoardsContext);
