const mongoose = require("mongoose");
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            require: true
        },
        comment: {
            type: String,
            require: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            require: true
        }
    },
    {
        timestamps: true
    }
);

var Comments = mongoose.model('orchids', commentSchema);
module.exports = Comments;