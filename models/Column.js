const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  },
);

columnSchema.pre("remove", async function (next) {
  try {
    // Delete all tasks associated with this column
    await this.model("Task").deleteMany({ _id: { $in: this.tasks } });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Column || mongoose.model("Column", columnSchema);
