const mongoose = require("mongoose");
import SubTask from "./SubTask";

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
        ref: "SubTask",
      },
    ],
  },
  {
    timestamps: true,
  },
);
taskSchema.pre("deleteOne", async function (next) {
  try{
    const task = await this.model.findOne(this.getQuery())
    await SubTask.deleteMany({ _id: { $in: task.subtasks } });
  }catch(error){
    next(error);
  }
})

taskSchema.pre("deleteMany", async function (next) {
  this._conditionsForDeletion = this.getQuery();
  const tasksToDelete = await this.model.find(this._conditionsForDeletion);

  const subTaskIds = tasksToDelete.reduce((acc, task) => {
    return acc.concat(task.subTasks);
  }, []);
  
  if (subTaskIds.length > 0) {
    await SubTask.deleteMany({ _id: { $in: subTaskIds } });
  }
  next();
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
