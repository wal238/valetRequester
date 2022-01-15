const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ValetSchema = new Schema ( {
    title: String,
    make: String,
    year: Number,
    color: String,
    liscense: String,
    dealership: String,
    location: String,
    price: Number,
    description: String
});

module.exports = mongoose.model('valetDemo',  ValetSchema);

