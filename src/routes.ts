import { Router } from 'express'
import users from './users/users.routes'
import role from './roles/role.routes'
import auth from './authentication/authentication.routes';

// guaranteed to get dependencies
export default () => {
  const app = Router()
  users(app)
  role(app)
  auth(app)

  return app
}
