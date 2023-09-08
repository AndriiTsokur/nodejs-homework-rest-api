import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const emailRegExp =
	/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		email: {
			type: String,
			match: [emailRegExp, 'Incorrect email format'],
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.pre('findOneAndUpdate', runValidateAtUpdate);
contactSchema.post('findOneAndUpdate', handleSaveError);
contactSchema.post('save', handleSaveError);

export const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegExp).required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean()
		.required()
		.messages({ 'any.required': 'missing field "favorite"' }),
});

const Contact = model('contact', contactSchema);

export default Contact;
