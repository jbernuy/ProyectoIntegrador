import deleteFile from '../libs/deleteFile';
import User from '../models/User';
import generateCodeUserByRole from '../libs/generateCodeUserByRole'
import transporter, { mailOptions } from '../libs/transporterEmail';

export default class UserController {

    static userControllerInstance;


    constructor() {}

    // Patrón singleton
    static getUserControllerInstance() {
        if (!UserController.userControllerInstance) {
            UserController.userControllerInstance = new UserController();
        }
        return UserController.userControllerInstance;
    }

    async getUsers(req, res) {
        try {
            const USERS = await User.find({})
            res.status(200).json({
                users: USERS,
                msg: 'Usuarios cargados correctamente!'
            });
        } catch (error) {
            res.status(400).json({ msg: 'Ocurrio un error y no se pudo obtener la lista de usuarios.', error });
        }
    }

    async getUser(req, res) {
        try {
            const USER = await User.findOne({ _id: req.params.userId });
            if (!USER) return res.status(400).json({ msg: 'El usuario no existe!', error });
            res.status(200).json({
                user: USER,
                msg: 'Usuario cargado correctamente!'
            });
        } catch (error) {
            res.status(400).json({ msg: 'Ocurrio un error y no se pudo obtener al usuario.', error });
        }
    }

    async addUser(req, res) {
        try {
            // Guardando un nuevo usuario
            const REQ_USER = JSON.parse(req.body.user);
            REQ_USER.accessCode = await generateCodeUserByRole(REQ_USER.role, REQ_USER.degree);

            const USER = new User(REQ_USER);

            USER.image = req.body.upload.fileUrl;
            USER.pathImage = req.file.path;

            const SAVED_USER = await USER.save();
            await transporter.sendMail(mailOptions(USER));

            //Enviando respuesta con un estado 200 con el usuario guardado
            res.status(200).json({
                user: SAVED_USER,
                msg: 'Te haz registrado con éxito!!'
            });

        } catch (error) {
            res.status(400).json({ msg: 'Ocurrio un error y no se guardó', error });
        }
    }

    async editUser(req, res) {
        try {
            const REQ_USER = JSON.parse(req.body.user);
            if (!req.file) {
                const USER_EDITED = await User.findByIdAndUpdate(REQ_USER._id, {
                    age: REQ_USER.age,
                    phone: REQ_USER.phone,
                    address: REQ_USER.address,
                    email: REQ_USER.email,
                    password: REQ_USER.password,
                }, { new: true });

                return res.status(200).json({ msg: 'Editado correctamente!', user: USER_EDITED });
            }
            await deleteFile(req.body.oldPath);
            const USER_EDITED = await User.findByIdAndUpdate(REQ_USER._id, {
                age: REQ_USER.age,
                phone: REQ_USER.phone,
                address: REQ_USER.address,
                email: REQ_USER.email,
                password: REQ_USER.password,
                image: req.body.upload.fileUrl,
                pathImage: req.file.path
            }, { new: true });
            return res.status(200).json({ msg: 'Guardado correctamente!', user: USER_EDITED });
        } catch (error) {
            res.status(400).json({ msg: 'Ocurrio un error editando sus datos!', error });
        }
    }

    async deleteUser(req, res) {
        try {
            const USER_DELETED = await User.findOne({ _id: req.params.userId });
            await User.deleteOne({ _id: req.params.userId });
            await deleteFile(USER_DELETED.pathImage);
            return res.status(200).json({
                msg: `El ${USER_DELETED.role} ${USER_DELETED.names} ${USER_DELETED.lastNames} ha sido eliminado!`,
            });
        } catch (error) {
            res.status(400).json({ msg: 'Ocurrio un error inesperado!', error });
        }

    }

}