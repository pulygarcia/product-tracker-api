import express from 'express'
import productRoutes from './routes/productsRoutes.js'

//create app
const app = express();

//define route
app.use('/api/products', productRoutes);

//define port
const PORT = process.env.PORT || 4000; //first option for the hosting if is necessary

//start app
app.listen(PORT, () => {
    console.log('Server working on PORT: ', PORT);
})