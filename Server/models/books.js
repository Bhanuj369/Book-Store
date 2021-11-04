const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
    title: { type: String },
    isbn: { type: String },
    pageCount: { type: Number },
    price: { type: Number },
    Url: { type: String },
    shortDescription: { type: String },
    author: { type: String },
    category: { type: String}
})

module.exports = mongoose.model('books', booksSchema)
