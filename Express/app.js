const express = require('express')
const http = require('http')
const Routes = require('./routes/router')
const app = express();
const path = require('path');
const userRoutes = require("./routes/users")
const { notFount, expressErrorHandler } = require('./modules/errorHandler');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Express", (error) => {
    if (!error) {
        console.log('Connected to db...');
    }
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use("/", Routes)
app.get('/', (req, res) => {
    res.status(200).send('hello its express text')
})
app.post('/post-data/:name', (req, res, next) => {
    try {
        if (Object.keys(req.body).length > 0) {
            return res.json({
                body: req.body,
                query: req.query,
                params: req.params,
                requestDate: req.request_date
            })
        }
        throw next({ status: 400, message: 'بدنه دیتا خالی میباشد' })
    } catch (error) {
        next(error)

    }
})


app.use(notFount)
app.use(expressErrorHandler)
http.createServer(app).listen(3500, () => {
    console.log('server is run in the 3500 port');
})

// second way for run express
// app.listen(3500, () => {
//     console.log('server is run in the 3500 port');
// })