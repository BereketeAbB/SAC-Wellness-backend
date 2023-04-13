const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log(req)
    res.end('user working')
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
        res.end('success')
    } catch (error) {
        res.end('error')
        return
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
        res.end('success')
    } catch (error) {
        res.end('error')
        return
    }
})

router.get('/getAppointment', async (req, res) => {
    const {stud_id} = req.params;
    const db = new Database('mongo')
    const appointment = await db.getAppointment(stud_id)
    res.end(appointment)
})

router.get('/getMedicalHealthTeam', async (req, res) => {
    const db = new Database('mongo')
    const appointment = await db.getMedicalHealthTeam()
    res.end(appointment)
})

router.get('/getMentalHealthTeam', async (req, res) => {
    const db = new Database('mongo')
    const appointment = await db.getMentalHealthTeam()
    res.end(appointment)
})

router.get('/getAvailableMedicalHealthTeam', async (req, res) => {
    const db = new Database('mongo')
    const appointment = await db.getAvailableMedicalHealthTeam()
    res.end(appointment)
})

router.get('/getAvailableMentalHealthTeam', async (req, res) => {
    const db = new Database('mongo')
    const appointment = await db.getAvailableMentalHealthTeam()
    res.end(appointment)
})

module.exports = router