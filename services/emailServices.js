const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateEmail(subject) {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `write an email about ${subject}`,
		max_tokens: 500,
		temperature: 0.5,
	});
	const { emailSubject, emailBody } = separateEmailSubjectAndBody(response);
	const formattedEmailBody = await formatEmail(emailBody);
	return { emailSubject, formattedEmailBody };
}

async function formatEmail(emailBody) {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `Format this email body with proper HTML line breaks - ${emailBody}`,
		max_tokens: 500,
		temperature: 0.5,
	});
	return response.data.choices[0].text.replaceAll('\n', '');
}

function separateEmailSubjectAndBody(response) {
	const email = response.data.choices[0].text;
	const breakPoint = email.indexOf("Dear");
	const emailSubject = email
		.substring(0, breakPoint)
		.replaceAll("\n", "")
		.replace("Subject: ", "");
	const emailBody = email.substring(breakPoint);
	return { emailSubject, emailBody };
}
module.exports = { generateEmail };
