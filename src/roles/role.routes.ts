import { Router } from 'express';
import { check } from 'express-validator';
import RoleController from './role.controller';
import { validateFields } from '../common/middlewares/validation.middleware';

const route = Router();

export default (app: Router) => {
    app.use('/role', route);

    route.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        validateFields,
    ], RoleController.createRole);
    route.get('/:id', RoleController.getRoleById);
};
