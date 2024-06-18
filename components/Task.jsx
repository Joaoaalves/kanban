import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SubTasks from "./Subtasks";
import Image from "next/image";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

export default function Task({ totalSubtasksCompleted, task, children }) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[80vw] rounded-lg !bg-light-bg px-4 dark:!bg-dark-grey sm:px-6 md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className="mb-6 flex items-center justify-between">
              {task.title}
              <Actions task={task} />
            </div>
          </DialogTitle>
          <DialogDescription className="mb-6 text-start">
            {task.description}
          </DialogDescription>
        </DialogHeader>
        <SubTasks
          totalSubtasksCompleted={totalSubtasksCompleted}
          subtasks={task.subTasks}
        />
      </DialogContent>
    </Dialog>
  );
}

function Actions({ task }) {
  "use client";
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (editOpen)
    return <EditTask task={task} open={editOpen} setOpen={setEditOpen} />;

  if (deleteOpen)
    return <DeleteTask task={task} open={deleteOpen} setOpen={setDeleteOpen} />;

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
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setDeleteOpen(!deleteOpen)}
          className="cursor-pointer text-red hover:bg-red hover:text-white"
        >
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
