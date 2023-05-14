const express = require('express')
const { Database } = require('../db/IDatabase')
const router = express.Router()

const db = new Database('test')

router.get('/', (req, res) => {
    console.log(req)
    res.end('service provider working')
})

router.post('/login', (req, res) => {
    try {
        const {
            email
        } = req.body

        if (!validator.isEmail(email))
        {
            res.status(400).json({status : 'error', result : "Invalid email : email should look like eg. example@example.com"})
            return
        }

        db.checkServiceProvider(email, (result) => {
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
                    || decodedToken.role !== process.env.SP_ROLE){
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

router.post('/setAppointment', (req, res) => {
    try {
        const {
            stud_id,
            date,
            hour,
            minute,
            remark
        } = req.body

        db.setAppointment(stud_id, date, hour, minute, remark, (result)=>{
            if (result)
                res.status(200).json({status : 'success', result : {msg : 'Appointment set successfully.'}})
            else 
                res.status(501).json({status : 'error', result : {msg : 'Setting appointment was unsuccessful.'}})
        })
    } catch (error) {
        res.status(501).json({status : 'error', result : {msg : 'Setting appointment was unsuccessful.'}})
    }
})

router.get('/getClientRequests', async (req, res) => {
    db.getClientRequests(( clientRequests )=>{
        res.status(200).send({
            status : 'success', 
            result : {
                msg : 'Requests fetched successfully.',
                data : clientRequests
            }
        })
    })
})

router.get('/getAppointments', (req, res) => {
    db.getAppointment((appointments) => {
        res.status(200).send({
            status : 'success', 
            result : {
                msg : 'Appointments fetched succefully.',
                data : appointments
            }
        })
    })
})

/** 
 * all private properties below this!
 */

let _createToken = (email, user_id) => {
    return jwt.sign({id : user_id, email : email, role : process.env.SP_ROLE}, process.env.JWT_SECRET, {
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
