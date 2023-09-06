import { contactsService } from '../models/contacts/index.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (_, res) => {
	const data = await contactsService.listContacts();
	res.json(data);
};

const getById = async (req, res) => {
	const { contactId: id } = req.params;

	const data = await contactsService.getContactById(id);
	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json(data);
};

const add = async (req, res) => {
	const data = await contactsService.addContact(req.body);
	res.status(201).json(data);
};

const deleteById = async (req, res) => {
	const { contactId: id } = req.params;

	const data = await contactsService.removeContact(id);
	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json({ message: 'Contact deleted' });
};

const updateById = async (req, res) => {
	const { contactId: id } = req.params;
	const data = await contactsService.updateContact(id, req.body);

	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json(data);
};

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	deleteById: ctrlWrapper(deleteById),
	updateById: ctrlWrapper(updateById),
};
