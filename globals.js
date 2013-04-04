var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

var Message = sequelize.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  message: Sequelize.TEXT
});

var port = 8080;
var ip = "127.0.0.1";

exports.headers = headers;
exports.Message = Message;
exports.port = port;
exports.ip = ip;