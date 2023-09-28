import User from '../../models/User.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const verify = async (req, res) => {
	const { verificationCode } = req.params;
	const user = await User.findOne({ verificationCode });

	if (!user) throw HttpError(404, 'User not found');

	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationCode: null,
	});

	res.json({
		message: 'Verification successful',
	});
};

export default ctrlWrapper(verify);
