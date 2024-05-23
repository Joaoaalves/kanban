const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    subtasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtask'
    }]
}, {
    timestamps: true
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema)