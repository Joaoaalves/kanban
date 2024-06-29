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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SubTasks from "./Subtasks";
import Image from "next/image";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { useBoard } from "@/contexts/BoardProvider";
import useColumn from "@/hooks/useColumn";

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
      <StatusSelector task={task}/>

      </DialogContent>
    </Dialog>
  );
}

function StatusSelector({task}){
  const {board, handleMoveTaskById, getColumns} = useBoard()

  const handleStatusUpdate = async (newStatus) => {
    await handleMoveTaskById(task._id, task.status, newStatus)
  }

  const columns = board ? getColumns() : [];
  
  return (
    <div className="mt-6">
      <label htmlFor="status" className="font-bold" >Current Status</label>
      <Select onValueChange={handleStatusUpdate} name="status" value={task.status} id="status">
        <SelectTrigger className="mt-2 w-full gap-x-2 !border-purple !bg-transparent dark:text-white px-4 py-2 body-l">
          <SelectValue placeholder="Current Status" />
        </SelectTrigger>
        <SelectContent>
          {columns && columns.map((column) => (
                <SelectItem value={column._id} key={column._id}>
                  {column.name}
                </SelectItem>
              )
            )}
        </SelectContent>
      </Select>
    </div>
  )
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
