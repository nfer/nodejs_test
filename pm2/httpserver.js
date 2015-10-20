var http = require('http');

var server = http.createServer( function (request, response){
    response.end('It Works!!');
});

server.listen(8080, function(){
    console.log("Server listening...");
});
