import Degree from '../models/Degree';

export default class DegreeController {

    static degreeControllerInstance;

    constructor() {}

    static getInstanceDegreeController() {
        if (!DegreeController.degreeControllerInstance) {
            DegreeController.degreeControllerInstance = new DegreeController();
        }
        return DegreeController.degreeControllerInstance;
    }

    async getDegrees(req, res) {
        try {
            const DEGREES = await Degree.find({});
            return res.status(200).json({
                msg: 'Carga completa',
                degrees: DEGREES
            })
        } catch (error) {
            return res.status(400).json({ msg: 'Ocurrió un error inesperado', error })
        }
    }

    async addDegree(req, res) {
        try {
            const DEGREE = new Degree({
                name: req.body.name,
                degreeCode: req.body.degreeCode,
                description: req.body.description
            });

            const DEGREE_SAVED = await DEGREE.save();

            return res.status(200).json({
                msg: 'Guardado correctamente!',
                degree: DEGREE_SAVED
            });

        } catch (error) {
            return res.status(400).json({ msg: 'Ocurrió un error inesperado', error })
        }
    }

    async editDegree(req, res) {
        try {
            const DEGREE_EDITED = await Degree.findOneAndUpdate({ _id: req.body._id }, {
                name: req.body.name,
                degreeCode: req.body.degreeCode,
                description: req.body.description
            }, { new: true })

            return res.status(200).json({
                msg: 'Editado correctamente!',
                degree: DEGREE_EDITED
            });

        } catch (error) {
            return res.status(400).json({ msg: 'Ocurrió un error inesperado', error })
        }
    }

    async deleteDegree(req, res) {
        try {
            await Degree.deleteOne({ _id: req.params.degreeId });

            return res.status(200).json({
                msg: 'Elimado correctamente!'
            });

        } catch (error) {
            return res.status(400).json({ msg: 'Ocurrió un error inesperado', error })
        }
    }

}