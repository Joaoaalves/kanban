import { useState } from "react";
import {useBoard} from "@/contexts/BoardProvider";
import Image from "next/image";
import NewTask from "./NewTask";
import EditBoard from "./EditBoard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteBoard from "./DeleteBoard";

export default function TopBar(boardId) {
  const { board } = useBoard(boardId);

  if (!board) return;
  return (
    <div className="row-span-1 light:border-light-lines flex min-h-16 h-24 w-full items-center justify-between border-b-2 bg-white px-6 dark:border-dark-lines dark:bg-dark-grey">
      <h1 className="heading-xl">{board.name}</h1>

      <div className="flex items-center justify-center gap-x-6">
        <NewTask board={board}>
          <button className="w-full rounded-full bg-purple px-6 py-2 font-bold text-white transition-all duration-300 hover:bg-light-purple hover:text-white">
            + Add New Task
          </button>
        </NewTask>
        
        <Actions board={board} />
      </div>
    </div>
  );
}

function Actions({ board }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (editOpen)
    return <EditBoard board={board} open={editOpen} setOpen={setEditOpen} />;

  if (deleteOpen)
    return (
      <DeleteBoard board={board} open={deleteOpen} setOpen={setDeleteOpen} />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="/images/icon-vertical-ellipsis.svg"
          width={5}
          height={20}
          alt="Settings Button Icon."
          className="select-none"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-4 bg-light-bg shadow-md dark:bg-dark-grey">
        <DropdownMenuItem
          onClick={() => setEditOpen(!editOpen)}
          className="cursor-pointer hover:bg-medium-grey/10 dark:hover:bg-dark-bg"
        >
          Edit Board
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setDeleteOpen(!deleteOpen)}
          className="cursor-pointer text-red hover:bg-red hover:text-white"
        >
          Delete Board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
