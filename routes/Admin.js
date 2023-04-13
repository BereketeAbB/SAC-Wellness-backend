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

router.post('/addServiceProvider', (req, res)=>{
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

//for this one we can make webhook style of thing to 
//handle auto request notification
router.get('/getClientRequests', (req, res) => {
    const db = new Database('mongo')
    db.addAdmin(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no)
    res.end('success')
})

//Other admin tools could be added here

module.exports = router