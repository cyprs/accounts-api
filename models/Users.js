const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    account_id: Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    state: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    },
    accounts: {
        type: Array,
    },
    mailconfirmkey: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);