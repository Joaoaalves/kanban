import mongoose from "mongoose";
import Board from "./Board";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    boards: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board"
    }]
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
