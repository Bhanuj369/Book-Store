const express = require('express')
const router = express.Router()

require('./routes/books')(router)
require('./routes/Users')(router)
require('./routes/authors')(router)
require('./routes/categories')(router)
require('./routes/cart')(router)

module.exports = router