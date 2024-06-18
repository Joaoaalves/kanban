import { updateBoardColumns, updateColumn as updateColumnApi } from "@/data/boards";

export const moveTask = async (source, destination, queryClient) => {
  if (!destination || (source.index === destination.index && source.droppableId === destination.droppableId)) {
    return;
  }

  const sourceColumn = queryClient.getQueryData(["column", source.droppableId]);
  const destinationColumn = queryClient.getQueryData(["column", destination.droppableId]);

  if (sourceColumn && destinationColumn) {
    const sourceTasks = [...sourceColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      queryClient.setQueryData(["column", source.droppableId], {
        ...sourceColumn,
        tasks: sourceTasks,
      });
      await updateColumnApi({ ...sourceColumn, tasks: sourceTasks });
    } else {
      const destinationTasks = [...destinationColumn.tasks];
      destinationTasks.splice(destination.index, 0, movedTask);

      queryClient.setQueryData(["column", source.droppableId], {
        ...sourceColumn,
        tasks: sourceTasks,
      });
      queryClient.setQueryData(["column", destination.droppableId], {
        ...destinationColumn,
        tasks: destinationTasks,
      });

      await updateColumnApi({ ...sourceColumn, tasks: sourceTasks });
      await updateColumnApi({ ...destinationColumn, tasks: destinationTasks });
    }
  }
};

export const moveColumn = async (source, destination, boardId, queryClient) => {
  if (!destination || destination.index === source.index) {
    return;
  }

  const board = queryClient.getQueryData(["board", boardId]);
  const columns = [...board.columns];
  const [movedColumn] = columns.splice(source.index, 1);
  columns.splice(destination.index, 0, movedColumn);

  queryClient.setQueryData(["board", boardId], { ...board, columns });
  await updateBoardColumns({ boardId, columns });
};