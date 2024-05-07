import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

//Both functions need the "res"parameter, cause res doesnt exist here. So they need use the response.

function isValidId(id, res){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('Invalid ID');

        return res.status(400).json({
            msg : error.message
        })
    }
}


function productNotFoundError(message, res){
    const error = new Error(message);

    return res.status(404).json({
        msg: error.message
    })
}

const generateID = () => {
    return Date.now().toString(32)+Math.random().toString(32).substring(2);
}

const generateJWT = (userId) => {
    const token = jwt.sign({id: userId}, process.env.PRIVATE_KEY, {expiresIn: 30});

    return token;
}

export{
    isValidId,
    productNotFoundError,
    generateID,
    generateJWT
}