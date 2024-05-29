import { connectDB } from "@/lib/connectDB";
import Board from "@/models/Board";
import Column from "@/models/Column";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import User from "@/models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session?.user)
    return res.status(403).json({ message: "Access Denied!" });

  const user = await findUser(session);

  if (req.method === "POST") return POST(req, res, user);
  if (req.method === "PUT") return PUT(req, res, user);

  return res.status(405).json({ message: "Method not allowed" });
}

async function POST(req, res, user) {
    try {
      await connectDB();
  
      const { boardId, name } = await req.body;
  
      if (!boardId || !name) {
        return res.status(400).json({ message: 'Missing boardId or name in request body' });
      }
  
      const board = await Board.findOne({
        _id: boardId,
        owner: user._id
      });
  
      if (!board) {
        return res.status(404).json({
          message: 'Invalid board_id or you do not have permission to access this board'
        });
      }
  
      const newColumn = await Column.create({ name });
  
      board.columns.push(newColumn._id);  
      await board.save();


      return res.status(201).json({
        message: "Column created successfully.",
        column: newColumn
      });
  
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  

async function PUT(req, res, user) {
  try {
    await connectDB();

    const data = req.body;

    const column = await Column.findByIdAndUpdate(data._id, {
        ...data
    })
    
    if(!column)
        return res.status(404).json({message: 'Board with this id not found'})

    return res
      .status(200)
      .json({ message: "Board updated successfully", column });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function findUser(session) {
  return await User.findOne({ email: session.user.email }, { password: 0 });
}
