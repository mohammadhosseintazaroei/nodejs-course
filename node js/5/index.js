const http = require("http");
const fs = require('fs')
http.createServer((req, res) => {
    const routes = req.url.split('/')
    if (req.url == "/") {
        res.write('index page')

    }
    if (req.url == "/product") {
        const product = fs.readFileSync('./products.html')
        res.write(product)

    }
    if (req.url == "/profile") {
        const profile = {
            name:'mohammad',
            last_name:'tazaroie',
            age:"14",

        }
        res.write(JSON.stringify(profile))
    }
    console.log(req.url);
    res.end()
}).listen(2500, () => {
    console.log('http://localhost:2500');
})