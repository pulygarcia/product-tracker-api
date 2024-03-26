import mongoose from "mongoose";

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

export{
    isValidId,
    productNotFoundError
}