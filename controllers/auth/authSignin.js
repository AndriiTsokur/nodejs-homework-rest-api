import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/User.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
	const { userEmail, userPassword } = req.body;

	const user = await User.findOne({ userEmail });
	if (!user) throw HttpError(401, 'Wrong email or password');

	const passwordCompare = await bcrypt.compare(userPassword, user.userPassword);
	if (!passwordCompare) throw HttpError(401, 'Wrong email or password');

	const { _id: id } = user;

	const payload = {
		id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
	await User.findByIdAndUpdate(id, { token });

	res.json({
		token,
	});
};

export default ctrlWrapper(signin);
