const mongoose = require('mongoose')
const uuid = require('uuid')
const gender = require("../enums/gender")

const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: String,
        min: 1,
        default: uuid.v4()
    },

    name: {
        type: String,
        required: true,
        trim: true,
        min: 1
    },

    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 255
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },

    gender: {
        type: String,
        enum: [gender.FEMALE, gender.MALE, gender.OTHER],
        default: gender.OTHER
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    mob: {
        type: String,
        min: 10,
        max: 16
    },

    signUpDate: {
        type: Date,
        default: Date.now
    }
}, 
    {
        versionKey: false
    }
)

module.exports = mongoose.model('User', userSchema)