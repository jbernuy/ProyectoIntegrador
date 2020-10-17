import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    names: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    accessCode: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
    image: {
        type: String,
        required: false,
        default: ''
    },
    pathImage: {
        type: String,
        required: false,
        default: ''
    },
    role: {
        type: String,
        required: false,
        default: ''
    },
    isEliminated: {
        type: String,
        required: false,
        default: false
    }
});

export default model('User', userSchema);