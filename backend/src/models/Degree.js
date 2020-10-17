import { Schema, model } from 'mongoose';

const degreeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    degreeCode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
})

export default model('Degree', degreeSchema);