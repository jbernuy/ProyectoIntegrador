import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateToken from '../middlewares/validateToken';
import multer from '../middlewares/multer';

export default class UserRoutes {

    static userRouteInstance;

    constructor() {
        this.router = Router();
        this.loadRoutes();
    }

    //Singleton
    static getUserRoute() {
        if (!UserRoutes.userRouteInstance) {
            UserRoutes.userRouteInstance = new UserRoutes();
        }
        return UserRoutes.userRouteInstance;
    }

    getRouter() {
        return this.router;
    }

    loadRoutes() {
        this.router.get('/', validateToken, UserController.getUserControllerInstance().getUsers);
        this.router.get('/:userId', validateToken, UserController.getUserControllerInstance().getUser);
        this.router.post('/', multer.single('image'), UserController.getUserControllerInstance().addUser);
        this.router.put('/', validateToken, multer.single('image'), UserController.getUserControllerInstance().editUser);
        this.router.delete('/:userId', validateToken, UserController.getUserControllerInstance().deleteUser);
    }

}