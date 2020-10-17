import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validateToken from '../middlewares/validateToken';

export default class AuthRoutes {

    static authInstance;

    constructor() {
        this.router = Router();
        this.loadRoutes();
    }

    //Singleton
    static getAuthRoute() {
        if (!AuthRoutes.authInstance) {
            AuthRoutes.authInstance = new AuthRoutes();
        }
        return AuthRoutes.authInstance;
    }

    getRouter() {
        return this.router;
    }

    loadRoutes() {
        this.router.get('/profile', validateToken, AuthController.getAuthController().getProfile);
        this.router.post('/signin', AuthController.getAuthController().signIn);
        this.router.put('/newtoken', validateToken, AuthController.getAuthController().renewToken);
    }

}