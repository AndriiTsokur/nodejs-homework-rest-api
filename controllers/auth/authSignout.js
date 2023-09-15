import User from '../../models/User.js';
import { ctrlWrapper } from '../../decorators/index.js';

const signout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: '' });

	res.json({
		message: 'Signout complete',
	});
};

export default ctrlWrapper(signout);
