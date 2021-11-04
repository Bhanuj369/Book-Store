const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email_id: { type: String },
    username: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('users', usersSchema)
