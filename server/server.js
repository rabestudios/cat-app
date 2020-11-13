require('dotenv').config(); // load .env conf
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const corsOptions = require('./src/utils/cors.options');

const db = require('./src/database')();

const app = express();

// middleware setup
app.use(cors(corsOptions));

const server = http.createServer(app);
const options = {
   cors: true,
   origins: ["*:*"]
}
const io = socketIO(server, options);

// SAMPLE_MIDDLEWARE
io.use((socket, next) => {
   const handshakeData = socket.request;
   const playerInfo = {
      displayName: handshakeData._query['displayName'],
      color: handshakeData._query['color']
   };
   socket.playerInfo = playerInfo;
   next();
});

io.on('connection', socket => {
   console.log('user connected', socket.id, socket.playerInfo);
   const existingSocket = db.getUsers().find(user => user.id === socket.id);

   if (!existingSocket) {
      db.addUser(socket.playerInfo, socket);
      const activeSockets = db.getUsers();
      const user = db.getUser(socket.id);
      const users = activeSockets.filter(sock => sock.id !== socket.id)
      socket.emit('update-user-list', { users });
      // socket.broadcast.emit('update-user-list', {
      //    users: [user]
      // });
   }

   socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
      db.disconnectUser(socket.id);
      // socket.broadcast.emit('disconnect-user', {
      //    socketId: socket.id
      // });
   });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
