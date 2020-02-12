const Procedures = Object();
const request = require('request');

Procedures.enviar = (url, data)=>{
    return new Promise(resolve=>{
        var options = {
            'method': 'POST',
            'url': url,
            'headers': {'Content-Type': 'application/json'},
            body: JSON.stringify({data})
        };
        //console.log("***", options)
        request(options, function (error, response) { 
        if (error) {throw new Error(error); resolve(false)}
            resolve(response.body);
        });
    });
}

module.exports = Procedures;