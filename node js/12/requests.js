//node-fetch
//axios
//request
//request-promise
//http

const request = require('request')
const result = request.get("https://api.freerealapi.com/blogs", {
    headers: {
        'Content-Type': 'application/json'
    }
}, (error, respone) => {
    if (!error) {
        require('fs').writeFileSync('blogs.json', JSON.stringify(JSON.parse(respone.body), null, 4), "utf-8");
    }
})
request.post('https://api.freerealapi.com/blogs/', {
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'nodejs api course',
        text: 'fdfdfdfdsa',
        tags: 'dfadsf'

    })
}, (error, respone) => {
    if (!error) {
        console.log(JSON.parse(respone.body));
    }
})
// request.post('https://api.freerealapi.com/auth/register', {
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         email: 'adfdsafdsfdsfdsafdsafli@gmail.com',
//         name: 'mohammad',
//         password: "mmd753"
//     })
// }, (error, respone) => {
//     if (!error) {
//         console.log(JSON.parse(respone.body));
//     }
// })