import mongoose from 'mongoose';
import {products} from '../data/productsList.js';
import Product from '../models/prodcutsModel.js';

const createProduct = async (req, res) => {
    //console.log('Creating product...');
    if(Object.values(req.body).includes('')){
        const error = new Error('Empty fields dont allowed');

        return res.status(400).json({
            msg : error.message
        })
    }

    try {
        const product = new Product(req.body);
        await product.save(); //save in DB using the Model (Model has not only the way you need the data, it has the db methods as well)

        res.json({
            msg: 'The product was created corectly'
        })

    } catch (error) {
        console.log(error);
    }
}


const getAllProducts = async (req, res) => {
    try {
        await res.json(products);

    } catch (error) {
        console.log(error.message);
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    //validate OBJECT ID with mongoose
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('invalid ID');
        return res.status(400).json({
            msg: error.message
        })
    }

    //validate if exist in db
    const product = await Product.findById(id);
    //console.log(product);

    //Show product
    res.json(product);
}

export {
    createProduct,
    getAllProducts,
    getProductById
}