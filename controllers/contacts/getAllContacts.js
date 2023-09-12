import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getAll = async (req, res) => {
	const data = await Contact.find();
	res.json(data);
};

export default ctrlWrapper(getAll);
// export default { getAll: ctrlWrapper(getAll) };
