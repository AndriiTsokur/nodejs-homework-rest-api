import express from 'express';
import Joi from 'joi';

import { contactsService } from '../../models/contacts/index.js';
import { HttpError } from '../../helpers/index.js';

const contactsRouter = express.Router();

const contactTemplate = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

contactsRouter.get('/', async (_, res, next) => {
	try {
		const data = await contactsService.listContacts();
		res.json(data);
	} catch (error) {
		next(error);
	}
});

contactsRouter.get('/:contactId', async (req, res, next) => {
	try {
		const { contactId: id } = req.params;
		const data = await contactsService.getContactById(id);
		if (!data) {
			throw HttpError(404, `No contact found for ID: ${id}`);
		}
		res.json(data);
	} catch (error) {
		next(error);
	}
});

contactsRouter.post('/', async (req, res, next) => {
	try {
		const { error } = contactTemplate.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const data = await contactsService.addContact(req.body);
		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
	try {
		const { contactId: id } = req.params;
		const data = await contactsService.removeContact(id);
		if (!data) {
			throw HttpError(404, `No contact found for ID: ${id}`);
		}
		res.json({ message: 'Contact deleted' });
	} catch (error) {
		next(error);
	}
});

contactsRouter.put('/:contactId', async (req, res, next) => {
	try {
		const { error } = contactTemplate.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}

		const { contactId: id } = req.params;
		const data = await contactsService.updateContact(id, req.body);
		if (!data) {
			throw HttpError(404, `No contact found for ID: ${id}`);
		}
		res.json(data);
	} catch (error) {
		next(error);
	}
});

export default contactsRouter;
