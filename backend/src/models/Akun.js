const mongoose = require('mongoose');

const AkunSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // Setiap user hanya punya 1 akun
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Akun', AkunSchema);
