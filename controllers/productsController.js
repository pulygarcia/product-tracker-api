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

export {
    createProduct,
    getAllProducts
}