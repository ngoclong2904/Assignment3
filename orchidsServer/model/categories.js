const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

var Categories = mongoose.model('categories', categoriesSchema);
module.exports = Categories;