// Implement interfaces defined in IDatabase file, specific to mysql

const MySQL = function () {
    
}

MySQL.prototype.addAdminInfo = function(f_name, l_name, email, username, password, stud_id) {
    console.table(f_name, l_name, email, username, password, stud_id)
}

module.exports = {MySQL}