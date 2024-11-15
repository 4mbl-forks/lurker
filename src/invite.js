const { db } = require("./db");

const validateInviteToken = async (req, res, next) => {
	const token = req.query.token;

	if (!token) {
		return res.render("register", {
			message: "this instance requires an invite",
			isDisabled: true,
		});
	}

	const invite = db
		.query("SELECT * FROM invites WHERE token = $token")
		.get({ token });

	if (!invite) {
		return res.render("register", {
			message: "this invite token is invalid",
			isDisabled: true,
		});
	}

	if (invite.usedAt) {
		return res.render("register", {
			message: "this invite has been claimed",
			isDisabled: true,
		});
	}

	req.invite = invite;
	next();
};

module.exports = {
	validateInviteToken,
};
