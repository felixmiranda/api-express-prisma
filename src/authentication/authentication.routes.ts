import { Router} from 'express';
import { body } from 'express-validator';
import { validateFields } from '../common/middlewares/validation.middleware';
import authenticationController from './authentication.controller';
import authenticationMiddleware from './authentication.middleware';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/login', [
        body('email', 'Invalid email value').isEmail(),
        body('password', 'Invalid string value').isString(),
        validateFields,
        authenticationMiddleware.verifyCredentials,
    ], authenticationController.logIn);

    // route.post('/refresh-token', [
    //     jwtMiddleware.validateRefreshToken,
    //     authController.logIn
    // ]);

}