import express from 'express';

import { contactsController } from '../../controllers/index.js';
import * as contactSchemas from '../../models/Contact.js';
import { validateBody } from '../../decorators/index.js';
import { isValidId } from '../../middlewares/index.js';

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
	contactSchemas.contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post('/', contactAddValidate, contactsController.add);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter.put(
	'/:contactId',
	isValidId,
	contactAddValidate,
	contactsController.updateById
);

contactsRouter.patch(
	'/:contactId/favorite',
	isValidId,
	contactUpdateFavoriteValidate,
	contactsController.updateById
);

export default contactsRouter;
