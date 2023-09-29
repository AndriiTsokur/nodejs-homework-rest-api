import nodemailer from 'nodemailer';
import 'dotenv/config';

const { UKRNET_EMAIL_FROM, UKRNET_EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
	host: 'smtp.ukr.net',
	port: 465,
	secure: true,
	auth: {
		user: UKRNET_EMAIL_FROM,
		pass: UKRNET_EMAIL_PASSWORD,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = data => {
	const email = { ...data, from: UKRNET_EMAIL_FROM };
	return transport.sendMail(email);
};

export default sendEmail;
