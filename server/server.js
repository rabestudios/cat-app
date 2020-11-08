require('dotenv').config(); // load .env conf
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const db = require('./src/database')();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.use((socket, next) => {
   const handshakeData = socket.request;
   console.log('middleware', handshakeData._query('name'));
   next();
});

io.on('connection', socket => {
   console.log('user connected', socket.id);

   socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
   });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
