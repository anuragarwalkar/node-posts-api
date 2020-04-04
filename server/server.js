const debug = require("debug")("node-angular");
const express = require('express');
const app = express();
const http = require("http");
const io = require('socket.io');
const connections = [];

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

const socket = io(server);

socket.on('connection', client => {
  connections.push(client);
  console.log('connection',connections.length);

  client.on('event', data => { console.log(data) });

  client.on('disconnect',()=>{
    connections.splice(connections.indexOf(client), 1);
    console.log('disconnected',connections.length)
})
});

app.use((req, res, next)=>{
  req.io = socket;
  next();
});


server.listen(port,()=>{
  console.log(`server is running on http://localhost:${port}`);
});

module.exports = app;


