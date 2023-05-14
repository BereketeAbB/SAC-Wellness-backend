const express = require("express");
const { Database } = require("../db/IDatabase");
const router = express.Router();

const db = new Database("mongo");

router.get("/", (req, res) => {
	res.end("admin working");
});

router.post("/signup", (req, res) => {
	try {
		const {
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no,
		} = req.body;

		db.addAdmin(
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no
		);
		res.status(200).send({ status: "success" });
	} catch (error) {
		res.status(400).send({ status: "error", result: error });
	}
});

router.post("/addServiceProvider", (req, res) => {
	try {
		const {
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no,
		} = req.body;
		db.addServiceProvider(
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no,
			(result) => {
				if (result.status)
					res.status(200).send({
						status: "success",
						result: {
							msg: "Service provider added successfully.",
						},
					});
				else
					res.status(401).send({
						status: "error",
						result: {
							msg: "Adding service provider unsuccessfully.",
							data: result,
						},
					});
			}
		);
	} catch (error) {
		res.status(400).send({ status: "error", result: error });
	}
});

router.post("/login", (req, res) => {
	//CHANGE of plans
});

router.get("/getClientRequests", async (req, res) => {
	db.getClientRequests((clientRequests) => {
		res.status(200).send({
			status: "success",
			result: {
				msg: "Request fetched successfully.",
				data: clientRequests,
			},
		});
	});
});

module.exports = router;
