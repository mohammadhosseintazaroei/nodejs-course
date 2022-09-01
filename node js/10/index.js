const { error } = require('console');
const { realpathSync } = require('fs');
const http = require('http')
const url = require('url')
const { MongoClient, ObjectId } = require('mongodb')
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
    const path = req.url;
    const method = req.method.toLowerCase();
    let query = url.parse(path, true).query;
    switch (path) {
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

        default:
            if (method == "delete" && path.includes("/users?id=")) {
                console.log(query);
                const { id } = query;
                if (ObjectId.isValid(id)) {
                    db.collection('users').deleteOne({ _id: ObjectId(id) }, (error, result) => {
                        if (!error) {
                            return res.end(JSON.stringify(result));
                        }
                        return res.end("Error in delete user")
                    })
                } else {
                    return res.end('object id is not valid')

                }

            } else if (["patch", "put", "post"].includes(method) && path.includes("/users?id=")) {
                const { id } = query;
                if (ObjectId.isValid(id)) {
                    let data = []

                    req.on("data", (chunk) => {
                        data.push(chunk.toString())
                    })
                    req.on("end", () => {
                        const result = JSON.parse(data)
                        db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { ...result} }, (error, result) => {
                            if (!error) {
                                return res.end(JSON.stringify(result));
                            }
                            return res.end("Error in delete user")
                        })
                        return res.end(JSON.stringify(result))

                    })
                } else {
                    return res.end('object id is not valid')

                }
            }
            break;
    }
}).listen(2500, () => {
    console.log('http://localhost:2500');
})