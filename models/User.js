import { Schema, model } from 'mongoose';
import Joi from 'joi';

import $EMAIL_REG_EXP from '../utils/index.js';
import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: [true, 'User name required'],
		},
		userEmail: {
			type: String,
			match: [$EMAIL_REG_EXP, 'Incorrect email format'],
			unique: true,
			required: [true, 'User email required'],
		},
		userPassword: {
			type: String,
			minlength: 6,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', runValidateAtUpdate);
userSchema.post('findOneAndUpdate', handleSaveError);
userSchema.post('save', handleSaveError);

export const userSignupSchema = Joi.object({
	userName: Joi.string().required(),
	userEmail: Joi.string().pattern($EMAIL_REG_EXP).required(),
	userPassword: Joi.string().min(6).required(),
});

export const userSigninSchema = Joi.object({
	userEmail: Joi.string().pattern($EMAIL_REG_EXP).required(),
	userPassword: Joi.string().min(6).required(),
});

const User = model('user', userSchema);

export default User;
