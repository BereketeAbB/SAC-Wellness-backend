const mongoose = require('mongoose')
const {APISearchFeatures} = require('./APISearchFeatures')
const {Admin, ServiceProvider, Student, Request} = require('./SchemaModels')
require('dotenv').config()

const MongoDb = function () {                               // Connection to the Database
    mongoose.connect(process.env.MONGO_CONN).then(() => {
        console.log("MongoDB Connection Successful");
    })
}

    //function that adds a new Admin/Student/ServiceProvider/Request to the MongoDB and returns the result
MongoDb.prototype.addAdmin = async function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no, callback) {
    await Admin.create({
        f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no
    }).then((data)=>{
        const ret = {status: true, ...data}
        callback(ret)
    }).catch((err)=>{
        callback(err)
    })
}

MongoDb.prototype.addStudent = async function (stud_id, f_name, l_name, email, phone_no, telegram_id, callback){
    await Student.create({
        stud_id, f_name, l_name, email, phone_no, telegram_id
    }).then((data)=>{
        const ret = {status: true, ...data}
        callback(ret)
    }).catch((err)=>{
        callback(err)
    })
} 

MongoDb.prototype.addServiceProvier = async function(f_name, m_name, l_name, email, callback) {
    await ServiceProvider.create({
        f_name, m_name, l_name, email, ed_info, diagnosis
    }).then((data)=>{
        const ret = {status: true, ...data}
        callback(ret)
    }).catch((err)=>{
        callback(err)
    })
}

MongoDb.prototype.addRequest = async function(stud_id, req_team_id, service_provider_id, urgency, callback){
    await Request.create({
            stud_id, req_team_id, service_provider_id, urgency
        }).then((data)=>{
            const ret = {status: true, ...data}
            callback(ret)
        }).catch((err)=>{
            callback(err)
        })
}

        //Functions that are used to find Admin/Student/ServiceProvider/Request from the MongoDB
MongoDb.prototype.getStudents = async function(reqQ, callback){
    try {
        console.log("test");
        const studQ = new APISearchFeatures(Student.find(), reqQ).filter().sort().fields().page()
        const gettedStuds = await studQ.query

        callback(gettedStuds)
    } catch (err) {
        callback(err)
    }
}

MongoDb.prototype.getServiceProviders = async function(reqQ, callback){
    try {
        const SP = new APISearchFeatures(ServiceProvider.find(), reqQ).filter().sort().fields().page()
        const gettedSP = await SP.query

        callback(gettedSP)
    } catch (err) {
        callback(err)
    }
}

MongoDb.prototype.getAdmins = async function (reqQ, callback){
    try{
        const AdminsQ = new APISearchFeatures(Admin.find(), reqQ).filter().sort().fields().page()
        const gettedAdmins = await AdminsQ.query

        callback(gettedAdmins)
    } catch (err) {
        callback(err)
    }
}

MongoDb.prototype.getRequests = async function (reqQ, callback){
    try{
        const requeQue = new APISearchFeatures(Admin.find(), reqQ).filter().sort().fields().page()
        const gettedRequests = await requeQue.query

        callback(gettedRequests)
    } catch (err) {
        callback(err)
    }
}

module.exports = {MongoDb}
