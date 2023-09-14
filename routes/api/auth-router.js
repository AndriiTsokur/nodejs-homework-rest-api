import express from 'express';

import { authController } from '../../controllers/index.js';
import * as userSchemas from '../../models/User.js';
import { validateBody } from '../../decorators/index.js';

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);

const authRouter = express.Router();

authRouter.post('/signup', userSignupValidate, authController.signup);

authRouter.post('/signin', userSigninValidate, authController.signin);

export default authRouter;
