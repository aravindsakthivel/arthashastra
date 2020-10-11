const Joi = require('joi')
const gender = require('../../enums/gender')

const regValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().min(6).email().required(),
        username: Joi.string().min(1).required(),
        gender: Joi.string().valid(gender.MALE, gender.FEMALE, gender.OTHER),
        password: Joi.string().min(6).required(),
        mob: Joi.string().min(10).max(16).rule({message: "Mobile Number must be of length >=10 and <=16"})
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    return schema.validate(data)
}

module.exports = {loginValidation, regValidation}