import { Router } from 'express';
import { check } from 'express-validator';
import RoleController from './role.controller';
import { validateFields } from '../common/middlewares/validation.middleware';
import jwtMiddleware from '../authentication/jwt.middleware';

const route = Router();

export default (app: Router) => {
    app.use('/role', route);

    route.post('/create', [
        check('name', 'Name is required').not().isEmpty(),
        validateFields,
    ], RoleController.createRole);
    route.get('/:id', jwtMiddleware.validateJWT, RoleController.getRoleById);
};
