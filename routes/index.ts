import { Router } from 'express';
import UserRouter from './UserRouter';
import AuthenticationRouter from './AuthenticationRouter';

const router = Router();

router.use('/users', UserRouter);
router.use('/authentication', AuthenticationRouter);

export default router;