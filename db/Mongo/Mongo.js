// Implement interfaces defined in IDatabase file, specific to mongo db
const mongoose = require('mongoose')
const {APISearchFeatures} = require('./APISearchFeatures')
const {Admin, Student, Physician, Request} = require('./SchemaModels)               
require('dotenv').config()

const MongoDb = function () {
    //TODO: initiating the connection with database here
    //TODO: database URI can be taken from .env or can be set as a constant here
    mongoose.connect(process.env.MONGO_CONN).then(() => {
        console.log("MongoDB Connection Successful");
    })
}


MongoDb.prototype.addAdmin = async function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no, callback) {
    await Admin.create({
        f_name,
        m_name, 
        l_name, 
        email, 
        speciality, 
        working_hour, 
        communication, 
        phone_no
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
    await Physician.create({
        f_name, 
        m_name, 
        l_name, 
        email,
        ed_info, 
        diagnosis
    }).then((data)=>{
        const ret = {status: true, ...data}
        callback(ret)
    }).catch((err)=>{
        callback(err)
    })
}


MongoDb.prototype.addRequest = async function(stud_id, req_team_id, service_provider_id, urgency, callback){
    await Request.create({
            stud_id,
            req_team_id, 
            service_provider_id, 
            urgency
        }).then((data)=>{
            const ret = {status: true, ...data}
            callback(ret)
        }).catch((err)=>{
            callback(err)
        })
}


MongoDb.prototype.getStudents = async function(reqQ, callback){
    try {
        console.log("test");
        const studQ = new APISearchFeatures(Student.find(), reqQ).filter().sort().fields().page()
        const gettedStuds = await studQ.query
        // gettedStuds[gettedStuds.length] = true;
        // console.log(gettedStuds);

        callback(gettedStuds)
    } catch (err) {
        callback(err)
    }
}


MongoDb.prototype.getServiceProviders = async function(reqQ, callback){
    try {
        const SP = new APISearchFeatures(Physician.find(), reqQ).filter().sort().fields().page()
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
