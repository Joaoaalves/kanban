import {useBoard} from "@/contexts/BoardProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NewColumn from "@/components/NewColumn";
import EditColumn from "@/components/EditColumn";
import Task from "./Task";
import useColumn from "@/hooks/useColumn";
import useTask from "@/hooks/useTask";

export default function Board() {
  const { board, handleMoveColumn, handleMoveTask } = useBoard();
  if(!board) return
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
    <div className="w-full bg-light-bg dark:bg-dark-bg custom-scroll">
      {board && !board.columns ? (
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
                className="max-w-full overflow-x-auto custom-scroll"
              >
                  <div className="flex items-start justify-start max-w-full p-6">
                    {board.columns.map((column, index) => (
                      <Column
                        key={column?._id ||  column}
                        columnId={column?._id ||  column}
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
    <section className="flex h-full w-full flex-col items-center justify-center gap-y-8">
      <p>This board is empty. Create a new column to get started.</p>
      <button className="w-full rounded-full bg-purple px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-light-purple hover:text-white">
        + Add New Column
      </button>
    </section>
  );
}

function Column({ columnId, index }) {
  const {column} = useColumn(columnId)
  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group m-4 mx-3 grid min-w-80 w-fit cursor-grab grid-cols-1 grid-rows-[3em_1fr] gap-y-5 rounded p-3 transition-all duration-300 hover:bg-medium-grey/5 dark:hover:bg-dark-grey/40"
        >
          {column && (
            <div className="flex w-full items-center justify-between">
              <EditColumn columnId={columnId}>
                <span className="heading-s cursor-pointer text-medium-grey">
                  {column.name} ({column?.tasks?.length})
                </span>
              </EditColumn>
            </div>
          )}
            <div className="grid h-[calc(80vh-96px)] !gap-y-5 overflow-y-auto overflow-x-hidden">
            <Droppable droppableId={column._id} type="TASK">
              {(provided) => (
                <div
                  className="h-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                  {column.tasks &&
                    column.tasks.map((task, index) => (
                      <TaskCard key={task._id} taskId={task._id} index={index} />
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
  const { task, totalSubtasksCompleted } = useTask(taskId)
  const { board } = useBoard()
  
  if(!task)
    return
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="grid p-2 hover:bg-light-lines/50 hover:dark:bg-medium-grey/20 dark:bg-dark-grey bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.101)] mb-5 rounded-lg transition-all duration-150"
        >
          <Task totalSubtasksCompleted={totalSubtasksCompleted} columns={board.columns} task={task}>
            <div className="p-2 py-4 cursor-pointer rounded-lg bg-white  transition-all duration-150 dark:bg-dark-grey  text-start">
              <h4 className="heading-m mb-2">{task.title}</h4>
              <p className="body-m !font-light">
                {totalSubtasksCompleted()} of {task.subTasks?.length}{" "}
                subtasks
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
