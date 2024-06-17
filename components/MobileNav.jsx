import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NewBoard from "./NewBoard";
import NewTask from "./NewTask";

import { FaPlus } from "react-icons/fa";
import useBoards from "@/hooks/useBoards";
import useBoard from "@/hooks/useBoard";
import ThemeToggle from "./ThemeToggle";
import DeleteBoard from "./DeleteBoard";
import EditBoard from "./EditBoard";

export default function MobileNav() {
  const { boards } = useBoards();

  const router = useRouter();
  const { board } = useBoard({ boardId: router.asPath.split("/", 3)[2] });

  return (
    <nav className="col-span-5 row-span-1 flex h-16 w-full items-center bg-white px-4 py-5 dark:bg-dark-grey sm:hidden">
      <Link href="/boards">
        <Image
          src={"/images/logo-mobile.svg"}
          width={32}
          height={32}
          className="me-4 h-8"
          alt="Kanban Mobile Logo"
        />
      </Link>

      <BoardSelect activeBoardId={board?._id} boards={boards} />
      {board ? (
        <>
          <NewTaskButton />
          <BoardActions board={board} />
        </>
      ) : (
        <>
          <NewBoardButton />
          <Actions />
        </>
      )}
    </nav>
  );
}

function BoardSelect({ boards, activeBoardId }) {
  const router = useRouter();
  
  const handleNavigate = (board) => {
    router.push(`/boards/${board}`);
  };
  
  return (
    <Select value={activeBoardId} onValueChange={handleNavigate}>
      <SelectTrigger className="heading-l w-auto gap-x-2 border-none !bg-transparent dark:text-white">
        <SelectValue placeholder="Your Boards" />
      </SelectTrigger>
      <SelectContent>
        {boards &&
          boards.map((board) => (
            <SelectItem value={board._id} key={board._id}>
              {board.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

function NewTaskButton() {
  return (
    <NewTask>
      <div className="me-4 ms-auto cursor-pointer rounded-full bg-purple px-5 py-2.5 transition-all duration-300 hover:bg-light-purple">
        <FaPlus className="text-white" />
      </div>
    </NewTask>
  );
}

function NewBoardButton() {
  return (
    <NewBoard>
      <div className="me-4 ms-auto cursor-pointer rounded-full bg-purple px-5 py-2.5 transition-all duration-300 hover:bg-light-purple">
        <FaPlus className="text-white" />
      </div>
    </NewBoard>
  );
}

function BoardActions({ board }) {
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

function Actions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="/images/icon-vertical-ellipsis.svg"
          width={5}
          height={20}
          alt="Settings Button Icon."
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-dark-grey">
        <DropdownMenuItem></DropdownMenuItem>
        <DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
