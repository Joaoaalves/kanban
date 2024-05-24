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
    
  const user = await findUser(session)

  if (req.method === "GET") return GET(res, user);
  if (req.method === "POST") return POST(req, res, user);
  
  return res.status(405).json({ message: "Method not allowed" });
}

async function GET(res, user){
    try{
        await connectDB();
        const boards = await Board.find({owner: user._id})
        return res.status(200).json({boards})

    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function POST(req, res, user){
  try {
    await connectDB();
    
    const { name, columns } = req.body;

    const newBoard = await Board.create({ name, owner: user._id });

    const createdColumns = await Column.insertMany(
      columns.map(column => ({ ...column, board: newBoard._id }))
    );

    newBoard.columns = createdColumns.map(column => column._id);
    await newBoard.save();

    return res.status(201).json({ message: "Board and columns created successfully", newBoard });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function findUser(session) {
    return await User.findOne({ email: session.user.email }, { password: 0 });
  }