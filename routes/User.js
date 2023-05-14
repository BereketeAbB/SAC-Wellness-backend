const router = require("express").Router();
const { Database } = require("../db/IDatabase");
require("dotenv").config();

const db = new Database('test')

router.get("/", (req, res) => {
	console.log(req);
	res.json("user working");
});

router.post("/login", (req, res) => {
	//change of plans
});

router.post("/addStudent", (req, res) => {
	/**Change of plans */
});

router.post("/addRequest", (req, res) => {
	try {
		const { stud_id, req_team_id, service_provider_id, urgency } = req.body;
		db.addRequest(stud_id, req_team_id, service_provider_id, urgency);
		res.status(200).json({ status: "success" });
	} catch (error) {
		res.status(400).json({ status: "error", result: error });
	}
});

router.get("/getAppointment", async (req, res) => {
	const { stud_id } = req.params;

	db.getAppointment(stud_id, (appointment) => {
		res.status(200).json({ status: "success", result: appointment });
	});
});

router.get("/getMedicalHealthTeam", async (req, res) => {

	db.getMedicalHealthTeam((medicalHealthTeam) => {
		res.status(200).json({ status: "success", result: medicalHealthTeam });
	});
});

router.get("/getMentalHealthTeam", async (req, res) => {

	db.getMentalHealthTeam((mentalHealthTeam) => {
		res.status(200).json({ status: "success", result: mentalHealthTeam });
	});
});

router.get("/getAvailableMedicalHealthTeam", async (req, res) => {

	db.getAvailableMedicalHealthTeam((availableMedicalHealthTeam) => {
		res.status(200).json({
			status: "success",
			result: availableMedicalHealthTeam,
		});
	});
});

router.get("/getAvailableMentalHealthTeam", async (req, res) => {

	db.getAvailableMentalHealthTeam((availableMentalHealthTeam) => {
		res.status(200).json({
			status: "success",
			result: availableMentalHealthTeam,
		});
	});
});

/**
 * all private properties below this!
 */

let _createToken = (email, user_id) => {
	return jwt.sign(
		{ id: user_id, email: email, role: process.env.USER_ROLE },
		process.env.JWT_SECRET,
		{
			expiresIn: "3h",
		}
	);
};

let _sendEmail = (email, verification_code, callback) => {
	//TODO: configure nodemailer properly

	let transporter = nodemailer.createTransport({
		host: "gmail", //this used to work
		auth: {
			user: "youremail@gmail.com",
			pass: "youremailpassword",
		},
	});

	let contact = {
		from: "SAC wellness program <SAC@SAC.com>",
		to: email,
		text: verification_code,
	};
	transporter
		.sendMail(contact)
		.then((result) => callback(true))
		.catch((error) => callback(false));
};

module.exports = router;
