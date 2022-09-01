const { error } = require('console');
const { realpathSync } = require('fs');
const http = require('http')
const { MongoClient } = require('mongodb')
const DB_URL = 'mongodb://localhost:27017/nodejs'
// const mongoclient = new MongoClient(DB_URL)
// const db = mongoclient.db('nodejs')
let mongoclient, db;
(async () => {
    mongoclient = new MongoClient(DB_URL);
    await mongoclient.connect((err, client) => {
        db = mongoclient.db()
    })
})();
http.createServer((req, res) => {
    const url = req.url;
    const method = req.method.toLowerCase();
    switch (url) {
        case '/users/insert':
            if (method == "post") {
                let data = [];
                req.on('data', (chunk) => {
                    data.push(chunk.toString())
                })

                req.on('end', () => {
                    const { name } = JSON.parse(data)
                    db.collection("users").insertOne({ name }, (error, result) => {
                        if (result.acknowledged) {
                            console.log(result.acknowledged);
                            return res.end(JSON.stringify({ name }))

                        }

                    })
                })
            }
            break;
        case '/users/list':
            if (method == "get") {
                const users = db.collection("users").find({}).toArray((error, result) => {
                    if (!error) return res.end(JSON.stringify(result))
                    return res.end("")
                });
            }
            break;
        case '/users/id':

            break;
        case '/users/update/id':

            break;
        case '/users/delete/id':

            break;

        default:
            break;
    }
}).listen(2500, () => {
    console.log('http://localhost:2500');
})