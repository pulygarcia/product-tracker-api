import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
    //console.log(req.headers.authorization);

    //Verify if it has received a valid json web token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //console.log('valid token');
        try {
            const token = req.headers.authorization.split(' ')[1];  //read jwt. (.split generete an array of texts that are separated by a ' ' on this case for get the jwt.

            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

            //Add user instance into the request in order to get access to it from the request in next middleware (check the next middleware in routes)
            req.user = await User.findById(decoded.id).select(  //as the jwt was created with user id before, when u verify it, u get the user id
                "-password -verified -token -__v"
            );
            console.log(req.user);

            next();

        } catch {
            const error = new Error('Token no válido');
            res.status(403).json({
                msg: error.message
            })
        }

    }else{
        //console.log('invalid token');
        const error = new Error('Token does not exist or is invalid');
        res.status(403).json({
            msg: error.message
        })
    }
}

export default authMiddleware