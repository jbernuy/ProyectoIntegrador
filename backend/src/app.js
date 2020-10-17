import express from 'express';
import allRoutes from './routes/index';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

class App {

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 3200);
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(cors());
    }
    routes() {
        this.app.use('/api/auth', allRoutes.authRoutes.getAuthRoute().getRouter()); // Autenticación
        this.app.use('/api/user', allRoutes.userRoutes.getUserRoute().getRouter()); // Usuarios
        this.app.use('/api/degree', allRoutes.degreeRoutes.getDegreeRoute().getRouter()); //Grados
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const serverApp = new App();

export default serverApp;