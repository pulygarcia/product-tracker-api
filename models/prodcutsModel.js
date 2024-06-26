import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        min: 1
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 0
    },
    brand:{
        type: String,
        required: true,
        trim: true
    }

})

//declare as a model
const products = mongoose.model('Products', productsSchema);

export default products;