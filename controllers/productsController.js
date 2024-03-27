import Product from '../models/prodcutsModel.js';
import {isValidId, productNotFoundError} from '../helpers/index.js'
import products from '../models/prodcutsModel.js';

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
        const poducts = await Product.find();

        res.json(products);

    } catch (error) {
        console.log(error.message);
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    //validate OBJECT ID with mongoose
    if(isValidId(id, res)){
        return;
    }

    //validate if exist in db
    const product = await Product.findById(id);
    if(!product){
        return productNotFoundError('Product not found', res);
    }

    //Show product
    res.json(product);
}


const updateProduct = async (req, res) => {
    const id = req.params.id;
    if(isValidId(id, res)){
        return;
    }

    const product = await Product.findById(id);

    if(!product){
        return productNotFoundError('Product not found', res);
    }

    //Rewrite in service the new values if there are, if there aren't. Keep the sames.
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.quantity = req.body.quantity || product.quantity;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;

    //Save the changes
    try {
        await product.save();

        res.json({
            msg: 'Updated correctly'
        })

    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    //Same validations
    if(isValidId(id, res)){
        return;
    }

    const product = await Product.findById(id);
    if(!product){
        return productNotFoundError('Product not found', res);
    }

    try {
        await product.deleteOne();

        res.json({
            msg: 'Deleted successfully'
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}