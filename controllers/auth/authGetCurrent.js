import { ctrlWrapper } from '../../decorators/index.js';

const getCurrrent = (req, res) => {
	const { userName, userEmail } = req.user;

	res.json({
		userName,
		userEmail,
	});
};

export default ctrlWrapper(getCurrrent);
