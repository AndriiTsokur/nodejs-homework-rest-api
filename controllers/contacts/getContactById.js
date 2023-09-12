import Contact from '../../models/Contact.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getById = async (req, res) => {
	const { contactId: id } = req.params;

	const data = await Contact.findById(id);
	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json(data);
};

export default ctrlWrapper(getById);
// export default { getById: ctrlWrapper(getById) };
