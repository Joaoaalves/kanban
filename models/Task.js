const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
    subTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtask",
      },
    ],
  },
  {
    timestamps: true,
  },
);

taskSchema.pre("remove", async function (next) {
  try {
    // Delete all subtasks associated with this task
    await this.model("Subtask").deleteMany({ _id: { $in: this.subTasks } });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
