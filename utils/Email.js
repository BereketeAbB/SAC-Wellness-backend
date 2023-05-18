const validator = require("validator");
const nodemailer = require("nodemailer");

let sendEmail = (email, verification_code, callback) => {
// 	//TODO: configure nodemailer properly
// 	console.log(verification_code);
// 	/*
// 	let transporter = nodemailer.createTransport({
// 		host: "gmail", //this used to work
// 		auth: {
// 			user: "youremail@gmail.com",
// 			pass: "youremailpassword",
// 		},
// 	});

// 	let contact = {
// 		from: "SAC wellness program <SAC@SAC.com>",
// 		to: email,
// 		text: verification_code,
// 	};
// 	transporter
// 		.sendMail(contact)
// 		.then((result) => callback(true))
// 		.catch((error) => callback(false));
// */
	callback(true);
};

module.exports = { sendEmail, validator };
