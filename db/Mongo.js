// Implement interfaces defined in IDatabase file, specific to mongo db

const MongoDb = function () {
    //TODO: initiating the connection with database here
    //TODO: database URI can be taken from .env or can be set as a constant here
}

MongoDb.prototype.addAdmin = function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no) {
    //TODO: putting admin information in a mongo database
}

module.exports = {MongoDb}