import User from '../models/User';
import jwt from 'jsonwebtoken';

export default class AuthController {

    static authController;

    static getAuthController() {
        if (!AuthController.authController) {
            AuthController.authController = new AuthController();
        }
        return AuthController.authController;
    }

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (!user) return res.status(404).json('Usuario no encontrado');

            res.status(200).json({
                user: user,
                msg: 'Perfil enviado correctamente!'
            });

        } catch (error) {
            return res.status(401).json({ msg: 'Unauthorized!', error });
        }
    }

    async signIn(req, res) {
        try {
            const user = await User.findOne({ accessCode: req.body.accessCode }); //Buscar usuario si existe y coincide

            if (!user) return res.status(400).json({ msg: 'El código no existe!' }); // si no existe el usuario retornar

            if (user.password !== req.body.password) return res.status(401).json({ msg: 'La contraseña es incorrecta!', user: null });

            //Crear token si todo sale bien
            const EXP_TIME = 60 * 10; //10 minutos
            const TOKEN = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN || '', {
                expiresIn: EXP_TIME,
            });

            const DATE_NOW = Date.now();
            const MILLIS_EXP = (DATE_NOW) + (EXP_TIME * 1000);
            const DATE_EXP = new Date(MILLIS_EXP);

            //Enviar una respuesta con el token creado y un estado 200
            res.header('authorization', TOKEN).status(200).json({
                authToken: TOKEN,
                millisExp: MILLIS_EXP,
                dateExp: DATE_EXP,
                msg: 'Login successfully!',
                user
            });
        } catch (error) {
            return res.status(404).json({ msg: 'Ocurrió un error inesperado', error });
        }
    }

    async renewToken(req, res) {
        try {
            const user = await User.findOne({ _id: req.body._id }); //Buscar usuario si aún existe

            if (!user) return res.status(400).json({ msg: 'La cuenta no existe!' }); // si ya no existe retornar

            // Volver a crear el token si todo es correcto
            const TIME_EXP = 60 * 10; //10 minutos
            const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN || '', {
                expiresIn: TIME_EXP,
            });

            const DATE_NOW = Date.now();
            const MILLIS_EXP = (DATE_NOW) + (TIME_EXP * 1000);
            const DATE_EXP = new Date(MILLIS_EXP);

            // Enviar una respuesta en formato JSON con el nuevo token y la fecha de expiración
            res.status(200).json({
                authToken: token,
                millisExp: MILLIS_EXP,
                dateExp: DATE_EXP,
                msg: 'Token refreshed successfully!'
            });
        } catch (error) {
            return res.status(404).json({ msg: 'Ocurrió un error inesperado mientras se renovaba el token!', error });
        }
    }
}