var server = require('pushstate-server');

server.start({
  port: 5089,
  directory: './dist'
});