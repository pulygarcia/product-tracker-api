import express from 'express'
import productRoutes from './routes/productsRoutes.js';
import {db} from './config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'

//Habilitar variables de entorno
dotenv.config();

//create app
const app = express();

//Allow read data via body
app.use(express.json());

//Connect DB
db();


//define route
app.use('/api/products', productRoutes);


//define port
const PORT = process.env.PORT || 4000; //first option for the hosting if is necessary

//start app
app.listen(PORT, () => {
    console.log(colors.blue('Server working on PORT: ', PORT));
})