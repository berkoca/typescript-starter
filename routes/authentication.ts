import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

const authentication_controller = new AuthenticationController();
const authentication_router = Router();

authentication_router.post('/login', authentication_controller.login);
authentication_router.post('/register', authentication_controller.register);

export default authentication_router;