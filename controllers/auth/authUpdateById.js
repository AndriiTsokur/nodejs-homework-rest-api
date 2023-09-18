import User from '../../models/User.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const updateById = async (req, res) => {
	const { userId: id } = req.params;
	const data = await User.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!data) throw HttpError(404, `No user found for ID: ${id}`);

	const { userEmail, userSubscription } = data;
	res.json({
		userEmail,
		userSubscription,
	});
};

export default ctrlWrapper(updateById);
