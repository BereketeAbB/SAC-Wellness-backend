const router = require('express').Router()
const {Database} = require('../db/IDatabase')
const validator = require("validator")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
require('dotenv').config()

router.get('/', (req, res) => {
    console.log(req)
    res.json('user working')
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

        db.checkStudent(email, (result) => {
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
                    || decodedToken.role !== process.env.USER_ROLE){
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

router.post('/addStudent', (req, res) => {
    try {
        const {
            f_name, 
            m_name,
            l_name,
            email,
            department,
            diagnosis,
        } = req.body
        const db = new Database('mongo')
        db.addStudent(f_name, m_name, l_name, email, department, diagnosis)
        res.status(200).json({status : 'success'})
    } catch (error) {
        res.status(400).json({status : 'error'})
    }
})

router.post('/addRequest', (req, res) => {
    try {
        const {
            stud_id, 
            req_team_id,
            service_provider_id,
            urgency
        } = req.body
        const db = new Database('mongo')
        db.addRequest(stud_id, req_team_id, service_provider_id, urgency)
        res.status(200).json({status : 'success'})
    } catch (error) {
        res.status(400).json({status : 'error', result : error})
    }
})

router.get('/getAppointment', async (req, res) => {
    const {stud_id} = req.params;
    const db = new Database('mongo')

    db.getAppointment(stud_id, (appointment)=> {
        res.status(200).json({status : 'success', 'result' : appointment})
    })
})

router.get('/getMedicalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getMedicalHealthTeam((medicalHealthTeam)=> {
        res.status(200).json({status : 'success', 'result' : medicalHealthTeam})
    })
})

router.get('/getMentalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getMentalHealthTeam((mentalHealthTeam)=> {
        res.status(200).json({status : 'success', 'result' : mentalHealthTeam})
    })
})

router.get('/getAvailableMedicalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getAvailableMedicalHealthTeam((availableMedicalHealthTeam)=> {
        res.status(200).json({status : 'success', 'result' : availableMedicalHealthTeam})
    })
})

router.get('/getAvailableMentalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getAvailableMentalHealthTeam((availableMentalHealthTeam)=> {
        res.status(200).json({status : 'success', 'result' : availableMentalHealthTeam})
    })
})

/** 
 * all private properties below this!
 */

let _createToken = (email, user_id) => {
    return jwt.sign({id : user_id, email : email, role : process.env.USER_ROLE}, process.env.JWT_SECRET, {
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