import { connectDB } from "@/lib/connectDB";
import SubTask from "@/models/SubTask";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";
import User from "@/models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session?.user)
    return res.status(403).json({ message: "Access Denied!" });

  const user = await findUser(session);
  if (req.method === "PUT") return PUT(req, res, user);

  return res.status(405).json({ message: "Method not allowed" });
}

async function PUT(req, res) {
  try {
    await connectDB();
    const { subTaskId } = req.query;
    const { isCompleted } = req.body;
    if (!subTaskId || typeof isCompleted === "undefined") {
      return res
        .status(400)
        .json({ message: "Invalid request: Missing required fields" });
    }

    const updatedSubTask = await SubTask.findByIdAndUpdate(
      subTaskId,
      { isCompleted: isCompleted },
      { new: true },
    );

    if (!updatedSubTask) {
      return res.status(404).json({ message: "SubTask not found" });
    }

    return res
      .status(200)
      .json({
        message: "SubTask successfully updated!",
        subTask: updatedSubTask,
      });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function findUser(session) {
  return await User.findOne({ email: session.user.email }, { password: 0 });
}
