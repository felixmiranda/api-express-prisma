import { Router } from 'express';
import { check } from 'express-validator';
import UsersController from './users.controller';
import { validateFields } from '../common/middlewares/validate-fields';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.post('/', [
        check('dni', 'DNI is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Must include password (6+ characters)').isLength({ min: 6 }),
        validateFields,
    ], UsersController.createUser);
    route.get('/:id', UsersController.getUserById);
};
