const mongoose = require("mongoose");

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

boardSchema.pre("remove", async function (next) {
  try {
    // Delete all columns associated with this board
    await this.model("Column").deleteMany({ _id: { $in: this.columns } });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Board || mongoose.model("Board", boardSchema);
