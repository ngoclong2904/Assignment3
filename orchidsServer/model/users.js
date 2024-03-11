const mongoose = require("mongoose");
const Schema = mongoose.Schema

const usersSchema = new Schema(
    {
        userName: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        name: {
            type: String,
            default: 'User Name'
        },
        YOB: {
            type: String,
            require: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

var Users = mongoose.model('users', usersSchema);
module.exports = Users;