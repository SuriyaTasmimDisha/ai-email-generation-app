const express = require("express");
const { generateEmail } = require("../services/emailServices");
const router = express.Router();

router.post("/generateEmail", async (req, res) => {
	const subject = req.body.subject
	const { emailSubject, formattedEmailBody } = await generateEmail(subject);
	res.status(200).json({
		emailSubject: emailSubject,
		emailBody: formattedEmailBody,
	});
});

module.exports = router;
