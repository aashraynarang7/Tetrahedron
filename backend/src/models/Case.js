const mongoose = require('mongoose');

// "Unknown" schema - using strict: false to allow any fields
const caseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled Case'
    },
    // Allow arbitrary data
}, {
    timestamps: true,
    strict: false
});

module.exports = mongoose.model('Case', caseSchema);
