const mongoose = require("mongoose");
const Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

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
            default: '2001'
        },
        isAdmin: {
            type: Boolean,
            default: false,
            require: true
        },
    },
    {
        timestamps: true
    }
);
var Users = mongoose.model('users', usersSchema);
module.exports = Users;
