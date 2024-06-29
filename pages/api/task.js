import { connectDB } from "@/lib/connectDB";
import Column from "@/models/Column";
import Task from "@/models/Task";
import SubTask from "@/models/SubTask";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session?.user)
    return res.status(403).json({ message: "Access Denied!" });

  if (req.method === "POST") return POST(req, res);
  if (req.method === "PUT") return PUT(req, res);
  if (req.method === "DELETE") return DELETE(req, res);

  return res.status(405).json({ message: "Method not allowed" });
}

async function POST(req, res) {
  try {
    await connectDB();

    const { title, description, subTasks, status } = req.body;

    const newTask = await Task.create({ title, description, status });

    const createdSubTasks = await SubTask.insertMany(
      subTasks.map((subTask) => ({ title: subTask.title, isCompleted: false })),
    );

    newTask.subTasks = createdSubTasks.map((subTask) => subTask._id);
    await newTask.save();

    await newTask.populate("subTasks");

    const column = await Column.findById(newTask.status);
    column.tasks = [...column.tasks, newTask._id];
    await column.save();

    return res
      .status(201)
      .json({ message: "Task successfully created!", task: newTask });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function PUT(req, res) {
  try {
    await connectDB();

    const { _id, title, description, status, subTasks } = req.body;

    var task = await Task.findById(_id);

    task.title = title;
    task.description = description;
    task.status = status;

    task.subTasks = await Promise.all(
      subTasks.map(async (sub) => {
        if (sub._id) {
          const existingSubTask = await SubTask.findByIdAndUpdate(
            sub._id,
            sub,
            { new: true },
          );
          return existingSubTask._id;
        } else {
          const newColumn = await SubTask.create({ ...sub, board: _id });
          return newColumn._id;
        }
      }),
    );

    await task.save();
    await task.populate("subTasks");

    return res
      .status(200)
      .json({ message: "Task updated successfully!", task });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function DELETE(req, res) {
  try {
    await connectDB();

    const { _id } = req.body;

    const deletedTask = await Task.findByIdAndDelete(_id);

    if (deletedTask)
      return res
        .status(200)
        .json({ message: "Task Deleted Successfully!", task: deletedTask });

    return res.status(404).json({ message: "Task not found." });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
