import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;

	const data = await Contact.find({ owner }, '-createdAt -updatedAt', {
		skip,
		limit,
	}).populate('owner', 'userName userEmail');

	res.json(data);
};

export default ctrlWrapper(getAll);
