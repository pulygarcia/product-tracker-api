import express from 'express'

//create app
const app = express();

//define route
app.get('/', (req, res) => {
    res.send('Res')
})
//define port
const PORT = process.env.PORT || 4000; //first option for the hosting if is necessary

//start app
app.listen(PORT, () => {
    console.log('Server working on PORT: ', PORT);
})