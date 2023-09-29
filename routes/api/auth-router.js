import express from 'express';

import { authController } from '../../controllers/index.js';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';
import { authenticate, upload } from '../../middlewares/index.js';

const userValidate = validateBody(userSchemas.userJoiSchema);
const userEmailValidate = validateBody(userSchemas.userEmailSchema);
const userUpdateSubscriptionValidate = validateBody(
	userSchemas.userUpdateSubscriptionSchema
);

const authRouter = express.Router();

authRouter.post('/signup', userValidate, authController.signup);

authRouter.get('/verify/:verificationCode', authController.verify);

authRouter.post(
	'/verify',
	userEmailValidate,
	authController.resendVerificationEmail
);

authRouter.post('/signin', userValidate, authController.signin);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/signout', authenticate, authController.signout);

authRouter.patch(
	'/:userId/subscription',
	authenticate,
	userUpdateSubscriptionValidate,
	authController.updateById
);

authRouter.patch(
	'/avatars',
	authenticate,
	upload.single('userAvatar'),
	authController.updateByToken
);

export default authRouter;
