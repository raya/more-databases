var VALID_GET_ROUTES = ['/', '/classes/room', '/classes/messages'];
var VALID_POST_ROUTES = ['/', '/classes/room'];
var globals = require('./globals');
var url = require("url");

var handleGetRequest = function(request, response, Table) { //table = collection in mongoDB Messages is a global var.
  var pathname = url.parse(request.url).pathname;
  if (!(checkValidRoutes(pathname, VALID_GET_ROUTES))) {
    response.writeHead(404, globals.headers);
    return;
  }
  switch(pathname) {
    case "/":
    case "/classes/room":
    Table.findAll({order: 'createdAt ASC'}).success(function(messages){
      response.end(JSON.stringify(messages));
    });
  }
};

var handlePostRequest = function(request, response, Table) {
  var pathname = url.parse(request.url).pathname;
  var postData = "";
  request.setEncoding();
  request.on("data", function(postDataChunk) {
    postData += postDataChunk;
  });

  request.on("end", function() {
    postData = JSON.parse(postData);
    Table.create({username: postData.username, message: postData.message });
  });
};

var checkValidRoutes = function(route, validRoutesList) {
  for (var i=0; i<validRoutesList.length; i++) {
    if (route === validRoutesList[i]) {
      return true;
    }
  }
  return false;
};

exports.handlePostRequest = handlePostRequest;
exports.handleGetRequest = handleGetRequest;