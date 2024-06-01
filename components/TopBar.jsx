import { useState } from "react";
import { useBoards } from "@/contexts/BoardsProvider";
import Image from "next/image";
import NewTask from "./NewTask";
import EditBoard from "./EditBoard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteBoard from "./DeleteBoard";
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
        <Actions board={activeBoard} />
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
      <DropdownMenuContent className="bg-light-bg dark:bg-dark-grey shadow-md me-4">
        <DropdownMenuLabel className="select-none">
          Board Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="!bg-light-lines dark:!bg-dark-lines" />
        <DropdownMenuItem
          onClick={() => setEditOpen(!editOpen)}
          className="hover:bg-medium-grey/10 cursor-pointer dark:hover:bg-dark-bg"
        >
          Edit Board
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setDeleteOpen(!deleteOpen)}
          className="hover:bg-red hover:text-white cursor-pointer text-red"
        >
          Delete Board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
