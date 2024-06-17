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
  if (req.method === "DELETE") return DELETE(req, res, user);

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
        populate: {
          path: "subTasks",
        },
      },
    });
    if (!board) return res.status(404).json({ message: "Board not found" });

    return res.status(200).json({ board });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function PUT(req, res, user) {
  try {
    await connectDB();

    const { boardId } = req.query;
    const { name, columns } = req.body;

    if (columns && !Array.isArray(columns)) {
      return res.status(400).json({ message: "Columns should be an array" });
    }

    const board = await Board.findOne({ _id: boardId, owner: user._id });
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (name) board.name = name;
    if (columns) board.columns = await updateColumns(columns);

    await board.save();

    const updatedBoard = await Board.findOne({
      _id: boardId,
      owner: user._id,
    }).populate({
      path: "columns",
      populate: {
        path: "tasks",
        populate: {
          path: "subTasks",
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Board updated successfully", board: updatedBoard });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function DELETE(req, res, user) {
  try {
    await connectDB();
    const { boardId } = req.query;

    const board = await Board.findOneAndDelete({
      _id: boardId,
      owner: user._id,
    });
    if (!board) return res.status(404).json({ message: "Board not found." });

    return res
      .status(200)
      .json({ message: "Board deleted successfully.", boardId: boardId });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function findUser(session) {
  return await User.findOne({ email: session.user.email }, { password: 0 });
}

async function updateColumns(columns) {
  return await Promise.all(
    columns.map(async (column) => {
      if (column._id) {
        const existingColumn = await Column.findByIdAndUpdate(
          column._id,
          column,
          { new: true },
        );
        return existingColumn._id;
      } else {
        const newColumn = await Column.create({ ...column, board: _id });
        return newColumn._id;
      }
    }),
  );
}
