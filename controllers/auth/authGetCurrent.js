import { ctrlWrapper } from '../../decorators/index.js';

const getCurrent = (req, res) => {
	const { userEmail, userSubscription } = req.user;

	res.json({
		userEmail,
		userSubscription,
	});
};

export default ctrlWrapper(getCurrent);
