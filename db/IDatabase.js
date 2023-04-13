const process = require('process')

const {MongoDb} = require('./Mongo') //Intellisense shows error on windows but it should work
const {MySQL} = require('./MySQL') //Intellisense shows error on windows because windows is case insensitive but it should work

const Database = function(dbms) {
    if (!dbms || dbms == 'mongo')
        this.dbms = new MongoDb(process.env.MONGO_CONF || '')
    else if (dbms == 'mysql')
        this.dbms = new MySQL(process.env.MYSQL_CONF || {})
}

Database.prototype.addAdmin = function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no) {
    this.dbms.addAdmin(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no)
}

Database.prototype.addStudent = function(f_name, m_name, l_name, email, department, diagnosis) {
    this.dbms.addStudent(f_name, m_name, l_name, email, department, diagnosis)
}

Database.prototype.addRequest = function(stud_id, req_team_id, service_provider_id, urgency){
    this.dbms.addRequest(stud_id, req_team_id, service_provider_id, urgency)
}

Database.prototype.getAppointment = function(stud_id){
    this.dbms.getAppointment(stud_id)
}

Database.prototype.getMedicalHealthTeam = function(){
    this.dbms.getMedicalHealthTeam()
}

Database.prototype.getMentalHealthTeam = function(){
    this.dbms.getMentalHealthTeam()
}

Database.prototype.getAvailableMedicalHealthTeam = function(){
    this.dbms.getAvailableMedicalHealthTeam()
}

Database.prototype.getAvailableMentalHealthTeam = function(){
    this.dbms.getAvailableMentalHealthTeam()
}

module.exports = {Database}