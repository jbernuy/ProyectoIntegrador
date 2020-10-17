import User from '../models/User';

export const validateAdminRole = async(req, res, next) => {
    try {
        const ADMIN = await User.findById(req.userId);
        if (!ADMIN) return res.status(400).json({ msg: 'No tienes permiso' });
        if (ADMIN.role !== 'administrador') return res.status(400).json({ msg: 'No tienes permiso para realizar esta acción!!' });
        next();
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrio un error al cargando los datos!', error });
    }
}

export const validateNoStudentRole = async(req, res, next) => {
    try {
        const ADMIN = await User.findById(req.userId);
        if (!ADMIN) return res.status(400).json({ msg: 'No tienes permiso' });
        if (ADMIN.role === 'alumno') return res.status(400).json({ msg: 'No tienes permiso para realizar esta acción!!' });
        next();
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrio un error en el proceso!', error });
    }
}