const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log(req)
    res.end('service provider working')
})

module.exports = router