import { connectDB } from "@/lib/connectDB";
import Column from "@/models/Column";
import Task from "@/models/Task";
import SubTask from "@/models/SubTask";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import User from "@/models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session?.user)
    return res.status(403).json({ message: "Access Denied!" });
    

  if (req.method === "GET") return GET(res);
  if (req.method === "POST") return POST(req, res);
  
  return res.status(405).json({ message: "Method not allowed" });
}

async function GET(res, user){
    // try{
    //     await connectDB();
    //     const boards = await Task.find({owner: user._id}).populate('columns')
    //     return res.status(200).json({boards})

    // }catch (error) {
    //     console.error("Error:", error);
    //     return res.status(500).json({ message: "Internal server error" });
    // }
}

async function POST(req, res, user){
    try {
      await connectDB();
      
      const { title, description, subTasks, status } = req.body;
  
      const newTask = await Task.create({ title, description, status });

      const createdSubTasks = await SubTask.insertMany(
        subTasks.map(subTask => ({ title: subTask.title, isCompleted: false }))
      );
      newTask.subTasks = createdSubTasks.map(subTask => subTask._id);
      await newTask.save();

      const column = await Column.findById(newTask.status)
      column.tasks = [...column.tasks, newTask._id]
      await column.save();

      return res.status(201).json({ message: "Task successfully created!", newTask });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }