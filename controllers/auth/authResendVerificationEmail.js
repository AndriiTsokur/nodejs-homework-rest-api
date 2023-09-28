import User from '../../models/User.js';
import { HttpError, sendEmail, verifyEmail } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const resendVerificationEmail = async (req, res) => {
	const { userEmail } = req.body;
	const user = await User.findOne({ userEmail });

	if (!user) throw HttpError(404, 'Email not found');
	if (user.verify) throw HttpError(400, 'Email has been already verified');

	await sendEmail(verifyEmail(userEmail, user.verificationCode));

	res.json({
		message: 'Verification email has been successfully resent',
	});
};

export default ctrlWrapper(resendVerificationEmail);
