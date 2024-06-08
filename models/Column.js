const mongoose = require("mongoose");
import Task from "./Task";

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

columnSchema.pre("deleteOne", async function (next) {
  try {
    const column = await this.model.findOne(this.getQuery());
    await Task.deleteMany({ _id: { $in: column.tasks } });
  } catch (error) {
    next(error);
  }
});

columnSchema.pre("deleteMany", async function (next) {
  try {
    this._conditionsForDeletion = this.getQuery();
    const columnsToDelete = await this.model.find(this._conditionsForDeletion);
    const taskIds = columnsToDelete.reduce((acc, column) => {
      return acc.concat(column.tasks);
    }, []);

    if (taskIds.length > 0) {
      await Task.deleteMany({ _id: { $in: taskIds } });
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.Column || mongoose.model("Column", columnSchema);
