const jwt = require("jsonwebtoken");

let createToken = (email, user_id, role) => {
	return jwt.sign(
		{ id: user_id, email: email, role: role },
		process.env.JWT_SECRET,
		{
			expiresIn: "3h",
		}
	);
};

module.exports = { createToken };
