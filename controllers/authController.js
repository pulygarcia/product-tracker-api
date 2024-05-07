import User from '../models/userModel.js'
import { sendVerificationEmail } from '../emails/authEmailServices.js';
import { generateJWT } from '../helpers/index.js';

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
        const error = new Error('Invalid token');

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

const login = async (req, res) => {
    //check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user){
        const error = new Error('User not found');

        return res.status(400).json({
            msg : error.message
        })
    }

    //check if is already verified
    if(user.verified == false){
        const error = new Error('Please verify your account');

        return res.status(400).json({
            msg : error.message
        })
    }

    //check the password using the bcrypt method from the model
    if(await user.checkPassword(req.body.password)){
        // return res.json({
        //     msg : "User authenticated"
        // });

        const token = generateJWT(user._id);
        //return jwt in order to save it in LocalStorage in frontend
        return res.json({
            token
        })

    }else{
        const error = new Error('Wrong password');

        return res.status(400).json({
            msg : error.message
        })
    }
}

const user = async (req, res) => {
    //get the user instance saved in the req (which has been created in auth middleware)
    console.log(req.user);
}

export {
    register,
    verifyUser,
    login,
    user
}