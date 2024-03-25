import {products} from '../data/productsList.js'

const createProduct = async (req, res) => {
    try {
        //console.log('Creating product...');
        const product = req.body;
        if(Object.values(product).includes('')){
            const error = new Error('Empty fields dont allowed');

            return res.status(400).json({
                msg : error.message
            })
        }

        

    } catch (error) {
        console.log(error.message);
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