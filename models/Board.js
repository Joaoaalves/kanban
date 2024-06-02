const mongoose = require("mongoose");
import Column from "./Column";
const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

boardSchema.pre("findOneAndDelete", async function (next) {
  try {
    const board = await this.model.findOne(this.getQuery())
    await Column.deleteMany({ _id: { $in: board.columns } });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Board || mongoose.model("Board", boardSchema);
