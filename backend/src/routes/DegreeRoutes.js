import { Router } from 'express';
import DegreeController from '../controllers/DegreeController';
import validateToken from '../middlewares/validateToken';

export default class DegreeRoutes {

    static degreeRouteInstance;

    constructor() {
        this.router = Router();
        this.loadRoutes();
    }

    //Singleton
    static getDegreeRoute() {
        if (!DegreeRoutes.degreeRouteInstance) {
            DegreeRoutes.degreeRouteInstance = new DegreeRoutes();
        }
        return DegreeRoutes.degreeRouteInstance;
    }

    getRouter() {
        return this.router;
    }

    loadRoutes() {
        this.router.get('/', DegreeController.getInstanceDegreeController().getDegrees);
        this.router.post('/', DegreeController.getInstanceDegreeController().addDegree);
        this.router.put('/', DegreeController.getInstanceDegreeController().editDegree);
        this.router.delete('/:degreeId', DegreeController.getInstanceDegreeController().deleteDegree);
    }

}