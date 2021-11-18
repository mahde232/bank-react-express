const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    passportID: {
        type: String,
        required: true,
    },
    cash: {
        type: Number,
        default: 0
    },
    credit: {
        type: Number,
        default: 0,
        min: [0, `credit can't be negative`]
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = {
    userModel
}
