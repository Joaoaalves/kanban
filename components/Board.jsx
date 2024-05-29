import { useBoards } from "@/contexts/BoardsProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Board({ boardId }) {
  const { getBoard, handleMoveColumn } = useBoards();
  const board = getBoard(boardId);

  if (!board) return null;
  
  const moveColumn = ({source, destination}) => {
    handleMoveColumn(source, destination)
  }

  return (
    <div className="w-full h-full bg-light-bg dark:bg-dark-bg">
      {board && !board.columns ? (
        <EmptyBoard />
      ) : (
        <DragDropContext onDragEnd={moveColumn}>
          <Droppable droppableId={board._id} direction="horizontal" type="COLUMN">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full h-full flex items-start justify-start gap-x-6 p-6"
              >
                {board.columns.map((column, index) => (
                  <Column key={column._id} column={column} index={index} />
                ))}
                {provided.placeholder}
                <NewColumn />
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
    <section className="w-full h-full flex flex-col items-center justify-center gap-y-8">
      <p>This board is empty. Create a new column to get started.</p>
      <button
        className="py-2 px-4 rounded-full w-full bg-purple text-white hover:bg-light-purple
                             hover:text-white transition-all duration-300 font-bold"
      >
        + Add New Column
      </button>
    </section>
  );
}

function Column({ column, index }) {
  const { handleMoveTask } = useBoards();

  const moveTask = ({ source, destination }) => {
    handleMoveTask(source, destination);
  };

  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="grid grid-cols-1 grid-rows-[3em_1fr] max-h-[85vh] min-w-72 gap-y-5 m-4 group hover:bg-medium-grey/5 dark:hover:bg-dark-grey/40 transition-all duration-300 rounded p-3 cursor-grab"
        >
          {column && (
            <span className="text-medium-grey heading-s">
              {column.name} ({column?.tasks?.length})
            </span>
          )}
          <ScrollArea className="!flex !flex-col !items-start justify-start !gap-y-5 max-h-[80vh]">
            <DragDropContext onDragEnd={moveTask}>
              <Droppable droppableId={column._id} type="TASK">
                {(provided) => (
                  <div
                    className="min-h-[70vh]"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.tasks &&
                      column.tasks.map((task, index) => (
                        <Task key={task._id} task={task} index={index} />
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ScrollArea>
        </div>
      )}
    </Draggable>
  );
}

function Task({ task, index }) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white dark:bg-dark-grey mb-5 hover:dark:bg-medium-grey/20 transition-all duration-150 
                                cursor-pointer w-72 p-4 rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.101)]"
        >
          <h4>{task.title}</h4>
          <p>{task.subTasks?.length} subtasks</p>
        </div>
      )}
    </Draggable>
  );
}

function NewColumn() {
  return (
    <div
      className="group mt-20 dark:hover:bg-dark-grey/40 flex flex-col items-center justify-center w-72 h-[70vh]
                        hover:bg-[#AFB6B9] dark:bg-dark-grey/20 cursor-pointer transition-all duration-150 
                        rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.101)]"
    >
      <span className="group-hover:scale-105 transition-all duration-300">
        + Add New Column
      </span>
    </div>
  );
}
