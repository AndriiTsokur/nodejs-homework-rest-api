import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';

const add = async (req, res) => {
	const data = await Contact.create(req.body);
	res.status(201).json(data);
};

export default ctrlWrapper(add);
