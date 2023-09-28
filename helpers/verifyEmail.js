const { BASE_URL } = process.env;

const verifyEmail = (email, verCode) => {
	return {
		to: email,
		subject: 'Verify your email address',
		html: `<a href="${BASE_URL}/api/auth/verify/${verCode}" target="_blank">Click to verify email</a>`,
	};
};

export default verifyEmail;
