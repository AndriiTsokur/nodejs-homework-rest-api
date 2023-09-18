import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { $EMAIL_REG_EXP } from '../helpers/index.js';
import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
	{
		userEmail: {
			type: String,
			match: [$EMAIL_REG_EXP, 'Incorrect email format'],
			unique: true,
			required: [true, 'User email required'],
		},
		userPassword: {
			type: String,
			minlength: 6,
			required: [true, 'Password is required'],
		},
		userSubscription: {
			type: String,
			enum: subscriptionList,
			default: 'starter',
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', runValidateAtUpdate);
userSchema.post('findOneAndUpdate', handleSaveError);
userSchema.post('save', handleSaveError);

export const userJoiSchema = Joi.object({
	userEmail: Joi.string().pattern($EMAIL_REG_EXP).required(),
	userPassword: Joi.string().min(6).required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
	userSubscription: Joi.string()
		.valid(...subscriptionList)
		.required()
		.messages({ 'any.required': 'missing field "userSubscription"' }),
});

const User = model('user', userSchema);

export default User;
