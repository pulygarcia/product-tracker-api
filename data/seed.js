import {db} from '../config/db.js';
import dotenv from 'dotenv'
import colors from 'colors'
import {products} from '../data/productsList.js';
import Products from '../models/prodcutsModel.js';



dotenv.config();//allow enviorment variables for the function below can read

//Connect db
await db();

async function seeder(){
    try {
        await Products.insertMany(products);
        console.log(colors.bgGreen('Data loaded correctly'));

        process.exit(0);
    } catch (error) {
        console.log(colors.bgRed(error));
        process.exit(1);
    }
}

async function clearDb(){
    try {
        await Products.deleteMany();
        console.log(colors.bgGreen('Data destroyed correctly'));

        process.exit(0);
    } catch (error) {
        console.log(colors.bgRed(error));
        process.exit(1);
    }
}

//console.log(process.argv[2]);

//This is gonna execute when run the seed command (u will call the command u need)
if(process.argv[2] === '--import'){
    seeder();
}else{
    clearDb();
}