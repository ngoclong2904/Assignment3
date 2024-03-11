const mongoose = require("mongoose");
const Schema = mongoose.Schema

const orchidsSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        original: {
            type: String,
            require: true
        },
        isNatural: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            require: true
        },
        // comments: [
        //     commentSchema
        // ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            require: true
        }
    },
    {
        timestamps: true
    }
);

var Orchids = mongoose.model('orchids', orchidsSchema);
module.exports = Orchids;