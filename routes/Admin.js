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
        res.status(200).send({status : 'success'})
    } catch (error) {
        res.status(400).send({status : 'error', result : error})
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
        db.addServiceProvider(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no, (result) => {
            if (result.status)
                res.status(200).send({
                    status : 'success',
                    result : {
                        msg : 'Service provider added successfully.'
                    }
                })
            else 
                res.status(401).send({
                    status : 'error',
                    result : {
                        msg : 'Adding service provider unsuccessfully.',
                        data : result
                    }
                })
        })
    } catch (error) {
        res.status(400).send({status : 'error', result : error})
    }
})

router.post('/login', (req, res) => {
    try {
        const {
            email
        } = req.body

        const db = new Database('test')
        if (!validator.isEmail(email))
        {
            res.status(400).json({status : 'error', result : "Invalid email : email should look like eg. example@example.com"})
            return
        }

        db.checkAdmin(email, (result) => {
            if (result){
                _sendEmail(result.email, _createToken(result.email, result._id), (isSuccess) => {
                    if (isSuccess)
                        res.status(200).json({status : 'success', result : {
                            msg : 'You should receive an email, with a verification token.'
                        }})
                    else
                        res.status(500).json({status : 'error', result : error})
                })
            }
            else
                res.status(401).json({status : 'unauthorized', result : result})
        })
        
    } catch (error) {
        res.status(400).json({status : 'error', result : {msg : error}})
    }
})

router.post('/verify', (req, res) => {
    try {
        const { token } = req.body

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken.hasOwnProperty('id') 
                    || !decodedToken.hasOwnProperty('email')
                    || !decodedToken.hasOwnProperty('role')
                    || decodedToken.role !== process.env.ADMIN_ROLE){
                res.status(403).json({status : 'error', result : {msg : 'Invalid token, please login again'}})
            }else {
                res.cookie("token", token, {
                    httpOnly : true
                }).json({
                    status : 'success', 
                    result : {
                        msg : 'Authenticated successfully.', 
                        token : token
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({status : 'error'})
    }
})

router.get('/getClientRequests', async (req, res) => {
    const db = new Database('mongo')
    db.getClientRequests((clientRequests)=>{
        res.status(200).send({
            status : 'success', 
            result : {
                msg : 'Request fetched successfully.',
                data : clientRequests
            }
        })
    })
})


/** 
 * all private properties below this!
 */

let _createToken = (email, user_id) => {
    return jwt.sign({id : user_id, email : email, role : process.env.ADMIN_ROLE}, process.env.JWT_SECRET, {
        expiresIn : '3h'
    })
}

let _sendEmail = (email, verification_code, callback) => {
    //TODO: configure nodemailer properly

    let transporter = nodemailer.createTransport({
        host : 'gmail', //this used to work
        auth : {
            user : 'youremail@gmail.com',
            pass : 'youremailpassword'
        }
    })

    let contact = {
        from : 'SAC wellness program <SAC@SAC.com>',
        to : email,
        text : verification_code
    }
    transporter.sendMail(contact).then(result => callback(true)).catch(error => callback(false))

}

module.exports = router