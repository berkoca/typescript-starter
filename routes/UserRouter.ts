import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authorization, authentication } from '../middlewares';
import { UserRole } from '../enums';

const controller: UserController = new UserController();
const router: Router = Router();

router.get('/:user_id', authentication, authorization([UserRole.ADMIN, UserRole.USER]), controller.getUser);
router.get('/', authentication, authorization([UserRole.ADMIN]), controller.getUsers);

export default router;