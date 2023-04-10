const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.end('admin working')
})

router.post('/addUser', (req, res)=>{
    try {
        const {
            f_name, 
            l_name,
            email,
            username,
            password,
            stud_id
        } = req.body
        console.log(f_name, l_name, email, username, password, stud_id)
        res.end()
    } catch (error) {
        console.log(error)
        return
    }

    
})

module.exports = router