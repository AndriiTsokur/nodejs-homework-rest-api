import Contact from '../../models/Contact.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const updateById = async (req, res) => {
	const { contactId: id } = req.params;
	const data = await Contact.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json(data);
};

export default ctrlWrapper(updateById);
