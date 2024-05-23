const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    }]
}, {
    timestamps: true
});


export default mongoose.models.Board || mongoose.model("Board", boardSchema)