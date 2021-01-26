import { Router } from "express";
import authentication_router from "./authentication";

const router = Router();

router.use('/authentication', authentication_router);

export default router;