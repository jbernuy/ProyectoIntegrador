import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        const authorization = req.header('authorization');
        if (!authorization) return res.status(401).json({ msg: 'Acceso Denegado' });
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.SECRET_TOKEN || '');
        if (!payload) {
            return res.status(401).json({ msg: 'Token expirado' });
        }
        req.userId = payload._id;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token erroneo', error });
    }
}