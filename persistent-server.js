var http = require("http");
var mysql = require("mysql");
var globals = require("./globals");
var router = require('./request-handler');

globals.Message.sync()
  .success(function() {
    console.log("Messages table successfully created in theory");
  })
  .error(function(err){
    console.log("ERROR EQUALS\n", err);
});

var requestListener = function (request, response) {
  console.log("Serving request type " + request.method
              + " for url " + request.url);
  var headers = globals.headers;
  router.router(request, response, globals.Message);
};

var server = http.createServer(requestListener);
  server.listen(globals.port, globals.ip);
  server.on('connection', function(stream) {
    console.log("Listening on http://" + globals.ip + ":" + globals.port);
});
