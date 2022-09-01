const { default: axios } = require('axios');
// axios.get("https://api.freerealapi.com/blogs/", {
//     headers: {
//         "Content-Type": "application/json"
//     }
// }).then(res => {
//     console.log(res.data);
// })
axios.post("https://api.freerealapi.com/blogs/", {
    text:'dfafdsf',
    title:'dfdsfadsf',
    tags:'dfasfsd'
},  {
    headers: {
        "Content-Type": "application/json"
    }
}).then(res => {
    console.log(res.data);
})