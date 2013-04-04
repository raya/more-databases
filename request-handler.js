/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var http = require("http");
var url = require("url");
var globals = require("./globals");
var handlers = require("./handlers");
var headers = globals.headers;

var router = function(request, response, Table) {
  var pathname = url.parse(request.url).pathname;

  switch(request.method) {
    case "OPTIONS":
      response.writeHead(200, globals.headers);
      response.write("");
      response.end();
      break;
    case "GET":
      handlers.handleGetRequest(request, response, Table);
      response.writeHead(200, globals.headers);
      return response;
    case "POST":
      handlers.handlePostRequest(request, response, Table);
      response.writeHead(200, globals.headers);
      response.end("\n");
      return response;
    default:
  }
  response.writeHead(200, globals.headers);
  return response;
};

exports.router = router;