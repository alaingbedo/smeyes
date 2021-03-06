var http = require('http'); //importing http

var options = {
    //host: 'smeyes.herokuapp.com',
    //port: 80,
    host: 'localhost',
    port: 1337,
    path: '/test'
};
console.log("======get_connections");
http.get(options, function(res) {
    res.on('data', function(chunk) {
        try {
            // optional logging... disable after it's working
            console.log("======data: HEROKU RESPONSE: " + chunk);
        } catch (err) {
            console.log(err.message);
        }
    });
}).on('error', function(err) {
    console.log("Error: " + err.message);
});