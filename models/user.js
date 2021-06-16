const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
    },
    lastName: {
        type: String,
        required: true,   
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    organsization: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
}));

module.exports.User= User