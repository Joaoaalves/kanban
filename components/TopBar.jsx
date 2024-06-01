import { useBoards } from "@/contexts/BoardsProvider";
import Image from "next/image";
import NewTask from "./NewTask";

export default function TopBar() {
  const { activeBoard } = useBoards();

  if (!activeBoard) return;
  return (
    <div className="w-full border-b-2 light:border-light-lines dark:border-dark-lines h-24 flex items-center justify-between bg-white dark:bg-dark-grey px-6">
      <h1 className="heading-xl">{activeBoard.name}</h1>

      <div className="flex items-center justify-center gap-x-6">
        <NewTask board={activeBoard}>
          <button className="py-2 px-6 rounded-full w-full bg-purple text-white hover:bg-light-purple hover:text-white transition-all duration-300 font-bold">
            + Add New Task
          </button>
        </NewTask>
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
