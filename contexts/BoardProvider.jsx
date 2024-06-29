import { createContext, useContext } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  getBoardById,
  editBoard as editBoardApi,
  createColumn as createColumnApi,
  updateBoardColumns,
  updateColumn as updateColumnApi,
} from "@/data/boards";
import { createTask as createTaskApi } from "@/data/tasks";
import { editTask as editTaskApi } from "@/data/tasks";

export const BoardContext = createContext();

const moveTask = async (source, destination, queryClient) => {
  if (
    !destination ||
    (source.index === destination.index &&
      source.droppableId === destination.droppableId)
  ) {
    return;
  }

  const sourceColumn = queryClient.getQueryData(["column", source.droppableId]);
  const destinationColumn = queryClient.getQueryData([
    "column",
    destination.droppableId,
  ]);

  if (sourceColumn && destinationColumn) {
    const sourceTasks = sourceColumn.tasks.map((task) =>
      queryClient.getQueryData(["task", task?._id || task]),
    );
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      await updateColumn(queryClient, { ...sourceColumn, tasks: sourceTasks });
    } else {
      const destinationTasks = destinationColumn.tasks.map((task) =>
        queryClient.getQueryData(["task", task?._id || task]),
      );
      destinationTasks.splice(destination.index, 0, movedTask);

      await updateColumn(queryClient, { ...sourceColumn, tasks: sourceTasks });
      await updateColumn(queryClient, {
        ...destinationColumn,
        tasks: destinationTasks,
      });

      await updateTask(queryClient, {...movedTask, status:destination.droppableId})
    }
  }
};

const moveTaskById = async (taskId, sourceColumnId, destinationColumnId, queryClient) => {
  if (!taskId || !sourceColumnId || !destinationColumnId) {
    return;
  }

  const sourceColumn = queryClient.getQueryData(["column", sourceColumnId]);
  const destinationColumn = queryClient.getQueryData(["column", destinationColumnId]);

  if (sourceColumn && destinationColumn) {
    const sourceTasks = sourceColumn.tasks.map((task) =>
      queryClient.getQueryData(["task", task?._id || task])
    );

    const taskIndex = sourceTasks.findIndex((task) => task._id === taskId);
    if (taskIndex === -1) return;

    const [movedTask] = sourceTasks.splice(taskIndex, 1);

    if (sourceColumnId === destinationColumnId) {
      sourceTasks.splice(0, 0, movedTask);
      await updateColumn(queryClient, { ...sourceColumn, tasks: sourceTasks });
    } else {

      const destinationTasks = destinationColumn.tasks.map((task) =>
        queryClient.getQueryData(["task", task?._id || task])
      );

      destinationTasks.splice( 0, 0, movedTask);

      await updateColumn(queryClient, { ...sourceColumn, tasks: sourceTasks });
      await updateColumn(queryClient, { ...destinationColumn, tasks: destinationTasks });

      await updateTask(queryClient, {...movedTask, status:destinationColumnId})
    }
  }
};
const updateTask = async (queryClient, task) => {
  queryClient.setQueryData(["task", task._id], task);
  await editTaskApi(task)
}
const updateColumn = async (queryClient, column) => {
  queryClient.setQueryData(["column", column._id], column);
  await updateColumnApi(column);
};

const updateBoardRemotely = async (boardId, updatedColumns) => {
  try {
    await updateBoardColumns({ boardId, columns: updatedColumns });
  } catch (error) {
    console.error("Error updating the board remotely: ", error);
  }
};

const moveColumn = async (source, destination, boardId, queryClient) => {
  if (!destination || destination.index === source.index) {
    return;
  }

  const board = queryClient.getQueryData(["board", boardId]);
  const columns = board.columns.map((col) =>
    queryClient.getQueryData(["column", col?._id || col]),
  );

  const [movedColumn] = columns.splice(source.index, 1);
  columns.splice(destination.index, 0, movedColumn);

  const updatedBoard = { ...board, columns };

  queryClient.setQueryData(["board", boardId], updatedBoard);
  await updateBoardRemotely(boardId, updatedBoard);
};

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
      newTask.subTasks.forEach((sub) =>
        queryClient.setQueryData(["subTask", sub._id], sub),
      );
    },
  });

  const { mutateAsync: editTask } = useMutation({
    mutationFn: async (task) => await editTaskApi(task),
    onSuccess: (task) => {
      queryClient.setQueryData(["task", task._id], task);
    },
  });

  const handleMoveTask = (source, destination) =>
    moveTask(source, destination, queryClient);
  const handleMoveColumn = (source, destination) =>
    moveColumn(source, destination, board._id, queryClient);
  const handleMoveTaskById = (taskId, sourceColumnId, destinationColumnId) => moveTaskById(taskId, sourceColumnId, destinationColumnId, queryClient)


  return (
    <BoardContext.Provider
      value={{
        board,
        editBoard,
        createColumn,
        handleMoveTask,
        handleMoveTaskById,
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
