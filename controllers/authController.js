import User from '../models/userModel.js'

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
        await user.save();

        res.json({
            msg: 'User was created, please check your Email'
        })

    } catch (error) {
        console.log(error);
    }
} 

export {
    register
}