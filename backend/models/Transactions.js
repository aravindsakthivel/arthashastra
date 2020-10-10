const mongoose = require('mongoose')
const uuid = require('uuid')

const category = require('../enums/category')
const type = require('../enums/type')

const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: String,
        min: 1,
        default: uuid.v4()
    },

    user_id: {
        type: String,
        required: true,
        min: 1
    },

    category: {
        type: String,
        default: category.MISCELLANOUS
    },

    type: {
        type: String,
        required: true,
        enum: [type.CREDIT, type.DEBIT]
    },

    amount: {
        type: Number,
        min: 0
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
}, 
    {
        versionKey: false
    }
)

module.exports = mongoose.model('User', userSchema)