import express from 'express';

import { authController } from '../../controllers/index.js';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';
import { authenticate } from '../../middlewares/index.js';

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);

const authRouter = express.Router();

authRouter.post('/signup', userSignupValidate, authController.signup);

authRouter.post('/signin', userSigninValidate, authController.signin);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/signout', authenticate, authController.signout);

export default authRouter;
