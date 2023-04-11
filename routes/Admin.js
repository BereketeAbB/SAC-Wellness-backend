const express = require('express')
const {Database} = require('../db/IDatabase')
const router = express.Router()

router.get('/', (req, res) => {
    res.end('admin working')
})

router.post('/addAdmin', (req, res)=>{
    try {
        const {
            f_name,
            m_name,
            l_name,
            email,
            speciality,
            working_hour,
            communication,
            phone_no
        } = req.body
        const db = new Database('mongo')
        db.addAdmin(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no)
        res.end('success')
    } catch (error) {
        res.end('error')
        return
    }

})

module.exports = router