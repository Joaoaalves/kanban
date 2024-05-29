import { connectDB } from "@/lib/connectDB";
import Board from "@/models/Board";
import Column from "@/models/Column";
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

async function PUT(req, res, user) {
  try {
    await connectDB();
    const { boardId } = req.query;
    const { columns } = req.body;

    const board = await Board.findOne({ _id: boardId, owner: user._id });
    if (!board) return res.status(404).json({ message: "Board not found" });

    // Update board columns order
    board.columns = columns.map((column) => column._id);
    await board.save();

    // Update tasks order
    await Promise.all(
      columns.map(async (column) => {
        await Column.findByIdAndUpdate(column._id, {
          tasks: column.tasks.map((task) => task._id),
        });
      }),
    );

    return res.status(200).json({ message: "Columns updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function findUser(session) {
  return await User.findOne({ email: session.user.email }, { password: 0 });
}
