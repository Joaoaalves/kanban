import { connectDB } from "@/lib/connectDB";
import Board from "@/models/Board";
import Column from "@/models/Column";
import Task from "@/models/Task";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";
import User from "@/models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session?.user)
    return res.status(403).json({ message: "Access Denied!" });

  const user = await findUser(session);
  if (req.method === "GET") return GET(req, res, user);
  if (req.method === "PUT") return PUT(req, res, user);

  return res.status(405).json({ message: "Method not allowed" });
}

async function GET(req, res, user) {
  try {
    await connectDB();
    const { boardId } = req.query;

    const board = await Board.findOne({
      _id: boardId,
      owner: user._id,
    }).populate({
      path: "columns",
      populate: {
        path: "tasks",
      },
    });
    if (!board) return res.status(404).json({ message: "Board not found" });

    return res.status(200).json({ board });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function PUT(req, res, user) {
  try {
    await connectDB();
    const { boardId } = req.query;
    const { columns } = req.body;
    const board = await Board.findOne({ _id: boardId, owner: user._id });
    if (!board) return res.status(404).json({ message: "Board not found" });

    board.columns = columns;
    await board.save();

    return res.status(200).json({ message: "Columns updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function findUser(session) {
  return await User.findOne({ email: session.user.email }, { password: 0 });
}
