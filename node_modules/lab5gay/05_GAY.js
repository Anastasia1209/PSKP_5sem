const nodemailer = require("nodemailer");

send = (senderAddr, senderPass, receiverAddr, message) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		seccure: false,
		service: "gmail",
		auth: {
			user: senderAddr,
			pass: senderPass,
		},
	});

	let mailOptions = {
		from: senderAddr,
		to: receiverAddr,
		subject: "Sending email using Node.js",
		text: message,
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports = send;
