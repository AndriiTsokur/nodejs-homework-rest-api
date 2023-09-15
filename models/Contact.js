import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { $EMAIL_REG_EXP } from '../helpers/index.js';
import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		email: {
			type: String,
			match: [$EMAIL_REG_EXP, 'Incorrect email format'],
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.pre('findOneAndUpdate', runValidateAtUpdate);
contactSchema.post('findOneAndUpdate', handleSaveError);
contactSchema.post('save', handleSaveError);

export const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern($EMAIL_REG_EXP).required(),
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
