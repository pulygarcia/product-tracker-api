import User from '../models/userModel.js'
import { sendVerificationEmail } from '../emails/authEmailServices.js';

const register =  async (req, res) => {
    //check if there are empty fields
    if(Object.values(req.body).includes('')){
        const error = new Error('Please complete the fields');
        
        return res.status(400).json({
            msg : error.message
        })
    }
    
    //avoid duplicates
    const userExist = await User.findOne({email: req.body.email})
    if(userExist){
        const error = new Error(`User with email ${req.body.email} already exists`);

        return res.status(400).json({
            msg : error.message
        })
    }

    //check valid password length
    const MIN_PASSWORD_LENGTH = 8;

    if(req.body.password.trim().length < MIN_PASSWORD_LENGTH){
        const error = new Error('Password must have at least 6 characters');

        return res.status(400).json({
            msg : error.message
        })
    }

    //create the user and save it
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        sendVerificationEmail({email: savedUser.email, token: savedUser.token});

        res.json({
            msg: 'User was created, please check your Email'
        })

    } catch (error) {
        console.log(error);
    }
}

const verifyUser = async (req, res) => {
    //console.log(req.params.token);
    const user = await User.findOne({token: req.params.token});

    if(!user){
        const error = new Error('User not found');

        return res.status(400).json({
            msg : error.message
        })
    }

    //user has been verified
    try {
        user.verified = true;
        user.token = ''; //token has only one use, so remove it when was verified

        await user.save();

        return res.json({
            msg : "Verified correctly"
        });

    } catch (error) {
        console.log(error);
    }
}

export {
    register,
    verifyUser
}