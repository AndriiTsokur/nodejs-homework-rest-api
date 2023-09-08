import { isValidObjectId } from 'mongoose';

import { HttpError } from '../helpers/index.js';

const isValidId = (req, res, next) => {
	const { contactId: id } = req.params;

	if (!isValidObjectId(id)) {
		return next(HttpError(404, `${id} is not a valid ID`));
	}

	next();
};

export default isValidId;
