const Joi = require('joi')

const transactAddValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().min(1).required(),
        type: Joi.string(),
        category: Joi.string(),
        amount: Joi.number().min(0.01).required()
    })

    return schema.validate(data)
}

const transactDeleteValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().min(1).required()
    })

    return schema.validate(data)
}

const transactUpdateValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        user_id: Joi.string().required(),
        type: Joi.string(),
        category: Joi.string(),
        amount: Joi.number().min(0.01).required()
    })

    return schema.validate(data)
}

const transactGetValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required()
    })

    return schema.validate(data)
}

module.exports = {transactAddValidation, transactDeleteValidation, transactUpdateValidation, transactGetValidation}