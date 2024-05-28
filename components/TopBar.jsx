import { useBoards } from "@/contexts/BoardsProvider";
import Image from "next/image";
import { NewTaskDialog } from "./NewTaskDialog";
export default function TopBar({ boardId }) {
  const { getBoard } = useBoards();
  const board = getBoard(boardId);

  if (!board) return;
  return (
    <div className="w-full border-b-2 light:border-light-lines dark:border-dark-lines h-24 flex items-center justify-between bg-white dark:bg-dark-grey px-6">
      <h1 className="heading-xl">{board.name}</h1>

      <div className="flex items-center justify-center gap-x-6">
        <NewTaskDialog board={board}>
          <button className="py-2 px-6 rounded-full w-full bg-purple text-white hover:bg-light-purple hover:text-white transition-all duration-300 font-bold">
            + Add New Task
          </button>
        </NewTaskDialog>
        <button className="group">
          <Image
            src="/images/icon-vertical-ellipsis.svg"
            width={5}
            height={20}
            alt="Settings Button Icon."
          />
        </button>
      </div>
    </div>
  );
}
