const request = require('request-promise')
    request.get('https://api.freerealapi.com/blogs/', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(JSON.parse(res)?.blogs?.[0]);
    }).catch(err => {
        console.log('err : ' + err.message);
    })

    // (async () => {
    //    const mmd = await request.get('https://api.freerealapi.com/blogs', {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     console.log(JSON.parse(mmd)?.blogs?.[0]);
    // })()