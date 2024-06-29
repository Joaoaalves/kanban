import { useBoard } from "@/contexts/BoardProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NewColumn from "@/components/NewColumn";
import EditColumn from "@/components/EditColumn";
import Task from "./Task";
import useColumn from "@/hooks/useColumn";
import useTask from "@/hooks/useTask";

export default function Board() {
  const { board, handleMoveColumn, handleMoveTask } = useBoard();
  if (!board) return;
  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      handleMoveColumn(source, destination);
    } else if (type === "TASK") {
      handleMoveTask(source, destination);
    }
  };

  return (
    <div className="custom-scroll w-screen bg-light-bg dark:bg-dark-bg sm:w-full">
      {board && board?.columns.length === 0 ? (
        <EmptyBoard />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={board._id}
            type="COLUMN"
            direction="horizontal"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="custom-scroll scroll-snap-x max-w-full overflow-x-auto"
              >
                <div className="flex max-w-full items-start justify-start p-4 sm:p-6">
                  {board.columns.map((column, index) => (
                    <Column
                      key={column?._id || column}
                      columnId={column?._id || column}
                      boardId={board._id}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                  <AddNewColumn />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

function EmptyBoard() {
  return (
    <section className="flex h-[calc(100vh-64px)] w-screen flex-col items-center justify-center gap-y-8 px-8 text-center sm:h-[calc(80vh-96px)] sm:w-full">
      <p>This board is empty. Create a new column to get started.</p>
      <NewColumn>
        <span className="w-48 cursor-pointer rounded-full bg-purple px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-light-purple hover:text-white">
          + Add New Column
        </span>
      </NewColumn>
    </section>
  );
}

function Column({ columnId, index }) {
  const { column } = useColumn(columnId);
  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group m-4 mx-3 grid w-fit min-w-72 cursor-grab snap-start grid-cols-1 grid-rows-[3em_1fr] gap-y-5 rounded p-3 transition-all duration-300 hover:bg-medium-grey/5 dark:hover:bg-dark-grey/40 sm:min-w-80"
        >
          {column && (
            <div className="flex w-full items-center justify-between">
              <EditColumn columnId={columnId}>
                <span className="heading-s cursor-pointer select-none text-medium-grey">
                  {column.name} ({column?.tasks?.length})
                </span>
              </EditColumn>
            </div>
          )}
          <div className="grid h-[calc(100vh-232px)] !gap-y-5 overflow-y-auto overflow-x-hidden sm:h-[calc(80vh-96px)]">
            <Droppable droppableId={column._id} type="TASK">
              {(provided) => (
                <div
                  className="h-full"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {column.tasks &&
                    column.tasks.map((task, index) => (
                      <TaskCard
                        key={task._id}
                        taskId={task._id}
                        index={index}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}

function TaskCard({ taskId, index }) {
  const { task, totalSubtasksCompleted } = useTask(taskId);
  const { board } = useBoard();

  if (!task) return;
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-5 grid rounded-lg bg-white p-3 shadow-[0px_4px_6px_0px_rgba(54,78,126,0.101)] transition-all duration-150 hover:bg-light-lines/50 dark:bg-dark-grey hover:dark:bg-medium-grey/20 sm:p-2"
        >
          <Task
            totalSubtasksCompleted={totalSubtasksCompleted}
            columns={board.columns}
            task={task}
          >
            <div className="cursor-pointer rounded-lg bg-white p-2 py-4 text-start transition-all duration-150 dark:bg-dark-grey">
              <h4 className="heading-m mb-2 select-none">{task.title}</h4>
              <p className="body-m select-none !font-light">
                {totalSubtasksCompleted()} of {task.subTasks?.length} subtasks
              </p>
            </div>
          </Task>
        </div>
      )}
    </Draggable>
  );
}

function AddNewColumn() {
  return (
    <NewColumn>
      <div className="group mt-20 flex h-[70vh] min-w-72 cursor-pointer flex-col items-center justify-center rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.101)] transition-all duration-150 hover:bg-[#AFB6B9] dark:bg-dark-grey/20 dark:hover:bg-dark-grey/40">
        <span className="transition-all duration-300 group-hover:scale-105">
          + Add New Column
        </span>
      </div>
    </NewColumn>
  );
}
