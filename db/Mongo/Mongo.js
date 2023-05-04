const mongoose = require("mongoose");
const { APISearchFeatures } = require("./APISearchFeatures");
const { Admin, ServiceProvider, Student, Request } = require("./SchemaModels");
require("dotenv").config();

const MongoDb = function () {
	// Connection to the Database
	mongoose.connect(process.env.MONGO_CONN).then(() => {
		console.log("MongoDB Connection Successful");
	});
};

//function that adds a new Admin/Student/ServiceProvider/Request to the MongoDB and returns the result
MongoDb.prototype.addAdmin = async function (
	f_name,
	l_name,
	email,
	telegram_id,
	speciality,
	working_hour,
	communication,
	phone_no,
	callback
) {
	await Admin.create({
		f_name,
		l_name,
		email,
		telegram_id,
		speciality,
		working_hour,
		communication,
		phone_no,
	})
		.then((data) => {
			const ret = { status: true, ...data };
			callback(ret);
		})
		.catch((err) => {
			callback(err);
		});
};

MongoDb.prototype.addStudent = async function (
	stud_id,
	f_name,
	l_name,
	email,
	phone_no,
	telegram_id,
	ed_info,
	diagnosis,
	callback
) {
	await Student.create({
		stud_id,
		f_name,
		l_name,
		email,
		phone_no,
		telegram_id,
		ed_info,
		diagnosis,
	})
		.then((data) => {
			const ret = { status: true, ...data };
			callback(ret);
		})
		.catch((err) => {
			const ret = { status: false, err };
			callback(ret);
		});
};

MongoDb.prototype.addServiceProvier = async function (
	f_name,
	m_name,
	l_name,
	email,
	callback
) {
	await ServiceProvider.create({
		f_name,
		m_name,
		l_name,
		email,
		ed_info,
		diagnosis,
	})
		.then((data) => {
			const ret = { status: true, ...data };
			callback(ret);
		})
		.catch((err) => {
			const ret = { status: false, err };
			callback(ret);
		});
};

MongoDb.prototype.addRequest = async function (
	stud_id,
	req_team_id,
	service_provider_id,
	urgency,
	callback
) {
	await Request.create({
		stud_id,
		req_team_id,
		service_provider_id,
		urgency,
	})
		.then((data) => {
			const ret = { status: true, ...data };
			callback(ret);
		})
		.catch((err) => {
			const ret = { status: false, err };
			callback(ret);
		});
};

//Functions that are used to find Admin/Student/ServiceProvider/Request from the MongoDB
MongoDb.prototype.getStudents = async function (reqQ, callback) {
	try {
		const studQ = new APISearchFeatures(Student.find(), reqQ)
			.filter()
			.sort()
			.fields()
			.page();
		const gettedStuds = await studQ.query;
		const ret = { status: true, result: gettedStuds };
		callback(ret);
	} catch (err) {
		const ret = { status: false, err };
		callback(ret);
	}
};

MongoDb.prototype.getServiceProviders = async function (reqQ, callback) {
	try {
		const SP = new APISearchFeatures(ServiceProvider.find(), reqQ)
			.filter()
			.sort()
			.fields()
			.page();
		const gettedSP = await SP.query;
		const ret = { status: true, result: gettedSP };
		callback(ret);
	} catch (err) {
		const ret = { status: false, err };
		callback(ret);
	}
};

MongoDb.prototype.getAdmins = async function (reqQ, callback) {
	try {
		const AdminsQ = new APISearchFeatures(Admin.find(), reqQ)
			.filter()
			.sort()
			.fields()
			.page();
		const gettedAdmins = await AdminsQ.query;
		const ret = { status: true, result: gettedAdmins };
		callback(ret);
	} catch (err) {
		const ret = { status: false, err };
		callback(ret);
	}
};

MongoDb.prototype.getRequests = async function (reqQ, callback) {
	try {
		const requeQue = new APISearchFeatures(Admin.find(), reqQ)
			.filter()
			.sort()
			.fields()
			.page();
		const gettedRequests = await requeQue.query;
		const ret = { status: true, result: gettedRequests };
		callback(ret);
	} catch (err) {
		const ret = { status: false, err };
		callback(ret);
	}
};

MongoDb.prototype.checkAdmin = async function (email, callback) {
	try {
		const findUserQ = new APISearchFeatures(Admin.find(), { email: email });
		const user = await findUserQ.query;

		if (user.length == 0) {
			const ret = {
				status: false,
				msg: `No Admin with this email ${email}`,
			};
			callback(ret);
		} else {
			const ret = {
				status: true,
				_id: user[0]._id,
				email: user[0].email,
			};
			callback(ret);
		}
	} catch (error) {
		callback({ status: false, ...error });
	}
};

MongoDb.prototype.checkStudent = async function (email, callback) {
	try {
		const findUserQ = new APISearchFeatures(Student.find(), {
			email: email,
		});
		const user = await findUserQ.query;

		if (user.length == 0) {
			const ret = {
				status: false,
				msg: `No Student with this email '${email}' was found.`,
			};
			callback(ret);
		} else {
			const ret = {
				status: true,
				_id: user[0]._id,
				email: user[0].email,
			};
			callback(ret);
		}
	} catch (error) {
		callback({ status: false, ...error });
	}
};

MongoDb.prototype.checkServiceProvider = async function (email, callback) {
	try {
		const findUserQ = new APISearchFeatures(ServiceProvider.find(), {
			email: email,
		});
		const user = await findUserQ.query;

		if (user.length == 0) {
			const ret = {
				status: false,
				msg: `No Service Provider with this email ${email}`,
			};
			callback(ret);
		} else {
			const ret = {
				status: true,
				_id: user[0]._id,
				email: user[0].email,
			};
			callback(ret);
		}
	} catch (error) {
		callback({ status: false, ...error });
	}
};
/**
MongoDb.prototype.checkAdmin = async function (email, callback) {
	 *  TODO: fetch exactely one record from database that matched the email
	 *  passed to this function
	 *  Data should be passed to a callback function on success with
	 *  {
	 *      status : true,
	 *      _id : "AnIDgivenByTheDBsystem",
	 *      email : "MatchingEmailThatIsFetchedFromTheDB"
	 *  }
	 *
	 * attributes on success and
	 *
	 * {
	 *      status : false,
	 *      err : err //error raised by mongo or not found message
	 * }
	 *
	 * on failure
	 * 
};
*/

/**
MongoDb.prototype.checkStudent = async function (email, callback) {
	 * Basically the same to checkAdmin but only fetched from student collection
};
*/

/**
MongoDb.prototype.checkServiceProvider = async function (email, callback) {
	 * Basically the same to checkAdmin but only fetched from serviceproviders collection
};
*/

module.exports = { MongoDb };
