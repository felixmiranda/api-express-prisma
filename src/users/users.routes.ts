import { Router } from 'express';
// import { check } from 'express-validator';
import UsersController from './users.controller';
// import { validateFields } from '../common/middlewares/validation.middleware';
import jwtMiddleware from '../authentication/jwt.middleware';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.get('/:id', jwtMiddleware.validateJWT,UsersController.getUserById);
    route.delete('/:id', jwtMiddleware.validateJWT,UsersController.deleteUserById);
};
