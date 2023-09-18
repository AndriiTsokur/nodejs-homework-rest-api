import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 10, favorite } = req.query;

	const skip = (page - 1) * limit;
	let data = null;

	if (favorite) {
		data = await Contact.find({ owner, favorite }, '-createdAt -updatedAt', {
			skip,
			limit,
		}).populate('owner', 'userEmail');
	} else {
		data = await Contact.find({ owner }, '-createdAt -updatedAt', {
			skip,
			limit,
		}).populate('owner', 'userEmail');
	}

	// const data = await Contact.find({ owner }, '-createdAt -updatedAt', {
	// 	skip,
	// 	limit,
	// }).populate('owner', 'userEmail');

	res.json(data);
};

export default ctrlWrapper(getAll);
