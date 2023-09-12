import Contact from '../../models/Contact.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const deleteById = async (req, res) => {
	const { contactId: id } = req.params;

	const data = await Contact.findByIdAndDelete(id);
	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json({ message: 'Contact deleted' });
};

export default ctrlWrapper(deleteById);
