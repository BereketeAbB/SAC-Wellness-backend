const express = require('express')
const router = express.Router()

router.use('/', (req, res) => {
    res.end('admin working')
})

module.exports = router