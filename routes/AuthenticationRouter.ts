import { Router } from 'express';
import { AuthenticationController } from '../controllers/AuthenticationController';

const controller: AuthenticationController = new AuthenticationController();
const router: Router = Router();

router.post('/login', controller.login);
router.post('/register', controller.register);

export default router;