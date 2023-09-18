import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';

const add = async (req, res) => {
	const { _id: owner } = req.user;
	const data = await Contact.create({ ...req.body, owner });
	res.status(201).json(data);
};

export default ctrlWrapper(add);
