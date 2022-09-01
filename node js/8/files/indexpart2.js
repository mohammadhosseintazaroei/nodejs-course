const http = require("http");
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const { basket, commetns, products, profile } = require('./api');
const { error } = require("console");
const { uploadfile } = require("../modules/uploadfile");
http.createServer((req, res) => {
    const routes = req.url.split('/')

    switch (req.url) {
        case "/":
            res.write('index page')
            break;
        case "/product":
            res.write(JSON.stringify(products))
            break;
        case "/profile":
            const profile = {
                name: 'mohammad',
                last_name: 'tazaroie',
                age: "14",

            }
            res.write(JSON.stringify(profile))
            break;
        case "/basket":
            const productIds = basket.map(item => item.productId)
            const myBasket = (products.filter(product => productIds.includes(product.id)).map(item => {
                item.count = basket.find(bask => bask.productId == item.id).count;
                item.basketProductPrice = item.count * item.price;

                return item
            }))
            res.write(JSON.stringify(myBasket))
            break;
        case "/comments":
            res.write(JSON.stringify(commetns))
            break;
        case "/fileupload":
            const result = uploadfile(req, res,'aaa')
            res.write(result)
            break;

        default:

            res.write(JSON.stringify({ status: 404, message: 'page not fount' }))
            break;
    }

    // console.log(req.url);
    res.end()
}).listen(2500, () => {
    console.log('http://localhost:2500');
})