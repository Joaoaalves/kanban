const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true
});

export default mongoose.models.Column || mongoose.model("Column", columnSchema)