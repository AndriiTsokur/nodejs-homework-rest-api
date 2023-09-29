import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';

import User from '../../models/User.js';
import { HttpError, sendEmail, verifyEmail } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const signup = async (req, res) => {
	const { userEmail, userPassword } = req.body;

	const user = await User.findOne({ userEmail });
	if (user) throw HttpError(409, 'Such email already exists');

	const hashUserPassword = await bcrypt.hash(userPassword, 10);

	const defaultAvatar = gravatar.url(userEmail, {
		protocol: 'https',
		size: '250',
		rating: 'pg',
		default: 'robohash',
	});

	const verificationCode = nanoid();

	const newUser = await User.create({
		...req.body,
		userPassword: hashUserPassword,
		userAvatarURL: defaultAvatar,
		verificationCode,
	});

	await sendEmail(verifyEmail(userEmail, verificationCode));

	res.status(201).json({
		user: {
			userEmail: newUser.userEmail,
			userSubscription: newUser.userSubscription,
			userAvatarURL: newUser.userAvatarURL,
		},
	});
};

export default ctrlWrapper(signup);
