import bcrypt from 'bcryptjs';

import User from '../../models/User.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const signup = async (req, res) => {
	const { userEmail, userPassword } = req.body;

	const user = await User.findOne({ userEmail });
	if (user) throw HttpError(409, 'Such email already exists');

	const hashUserPassword = await bcrypt.hash(userPassword, 10);

	const newUser = await User.create({
		...req.body,
		userPassword: hashUserPassword,
	});

	res.status(201).json({
		userName: newUser.userName,
		userEmail: newUser.userEmail,
	});
};

export default ctrlWrapper(signup);
