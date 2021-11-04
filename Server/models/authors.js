const mongoose = require('mongoose')

const authorsSchema = new mongoose.Schema({
    author: { type: String }
})

module.exports = mongoose.model('authors', authorsSchema)
