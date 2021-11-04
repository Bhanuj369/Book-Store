const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    title: { type: String },
    isbn: { type: String },
    pageCount: { type: Number },
    price: { type: Number },
    Url: { type: String },
    shortDescription: { type: String },
    author: { type: String },
    category: { type: String},
    quantity: { type: Number }
})

module.exports = mongoose.model('cart', cartSchema)