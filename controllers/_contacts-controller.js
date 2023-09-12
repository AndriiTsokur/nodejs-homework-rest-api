import Contact from '../models/Contact.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
	const data = await Contact.find();
	res.json(data);
};

const getById = async (req, res) => {
	const { contactId: id } = req.params;

	const data = await Contact.findById(id);
	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json(data);
};

const add = async (req, res) => {
	const data = await Contact.create(req.body);
	res.status(201).json(data);
};

const deleteById = async (req, res) => {
	const { contactId: id } = req.params;

	const data = await Contact.findByIdAndDelete(id);
	if (!data) {
		throw HttpError(404, `No contact found for ID: ${id}`);
	}
	res.json({ message: 'Contact deleted' });
};

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

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	deleteById: ctrlWrapper(deleteById),
	updateById: ctrlWrapper(updateById),
};
