const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Products = new Schema({
    name : String,
    category : String,
    tag : String,
    price : String,
    quantity:String
});

module.exports = mongoose.model('Products', Products);