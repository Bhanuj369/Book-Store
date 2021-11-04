const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    category: { type: String }
})

module.exports = mongoose.model('categories', categoriesSchema)
