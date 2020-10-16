const bcrypt = require("bcryptjs");

const {loginValidation, regValidation} = require("../helpers/validations/authValidation");

const User = require('../models/Users')

const registerUser = async (req, res) => {
    const {error} = regValidation(req.body)
    if(error){
        return res.status(400).json({error: true, message: error.details[0].message})
    }
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists){
        return res.status(400).json({error: true, message: "Email already registered"})
    }
    const usernameExists = await User.findOne({username: req.body.username})
    if(usernameExists){
        return res.status(400).json({error: true, message: "Username already registered"})
    }

    const hashedPassword = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        mob: req.body.mob,
        gender: req.body.gender
    })

    try{
        await user.save()
        res.status(200).json({error: false, message: "registration successfull"})
    }
    catch(err){
        res.status(400).json({error: true, message: "Registration Unsuccessful.", info: err})
    }
}

const loginUser = async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).json({error: true, message: error.details[0].message})
    }
    
    const user = await User.findOne({username: req.body.username})
    if(!user){
        return res.status(400).json({error: true, message: "Credentials do not match."})
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        res.status(400).json({error: true, message: "Credentials do not match."})
    }
    else{
        res.status(200).json({
            error: false, 
            message: "Logged In", 
            data: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                mob: user.mob,
                gender: user.gender
            }
        })
    }
}

module.exports = {registerUser, loginUser}