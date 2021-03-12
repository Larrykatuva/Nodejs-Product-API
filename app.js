const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');


const app = express()
app.use(bp.json());


/**
 * Connecting to Mongo Database
 */
mongoose.connect('mongodb+srv://@cluster0.p3e8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    dbName: 'NodeJs',
    user: 'KATUVA',
    pass: 'Larry@98!',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongo Db Connected');
})


/**
 * Handling Product routes
 */
const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);




/**
 * Handling Errors
 */
app.use((req, res, next) => {
    const err = new Error("Not found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000...');
})