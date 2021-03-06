require('dotenv').config(); // load .env conf
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const corsOptions = require('./src/utils/cors.options');

const db = require('./src/database')();

const { joinRoom, leaveRoom } = require('./src/socket');

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
   const query = handshakeData._query;
   const playerInfo = {
      displayName: query.displayName,
      color: query.color,
      x: parseInt(query.x),
      y: parseInt(query.y),
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
      const rooms = db.getRooms();
      socket.emit('update-user-list', { users });
      socket.emit('update-room-list', { rooms });
      socket.broadcast.emit('update-user-list', {
         users: [user]
      });
   }

   socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
      const rooms = db.getRooms();
      // disconnect from room
      for (const room of rooms) {
         const playerIdx = room.players.findIndex(p => p.id === socket.id);
         if (playerIdx !== -1) {
            const host = db.removePlayerFromRoom(room.code, socket.id);
            if (!host) {
               socket.broadcast.emit('remove-room', {roomCode: room.code});
            } else {
               socket.broadcast.emit('update-room-list', {rooms});
            }
            break;
         }
      }
      db.disconnectUser(socket.id);
      socket.broadcast.emit('disconnect-user', {
         socketId: socket.id
      });
   });

   socket.on('host-room', (data) => {
      console.log('user started hosting a game: ', data.hostId);
      const newRoom = db.createRoom(data.hostId);
      const rooms = db.getRooms();
      const user = db.getUser(data.hostId);
      joinRoom(socket, newRoom, user);
      socket.emit('update-room-list', { rooms });
      socket.broadcast.emit('update-room-list', {
         rooms: [newRoom]
      });
   });

   socket.on('join-room', (data) => {
      const { playerId, roomCode, playerInfo } = data;
      const user = db.setUserInfo(playerId, playerInfo);
      if (user) {
         const res = db.addPlayerToRoom(roomCode, playerId);
         if (res) {
            const { newDetails, room } = res;
            const updatedUser = db.setUserInfo(playerId, newDetails);
            if (updatedUser) {
               joinRoom(socket, room, updatedUser);
            }
         }
      }
   });

   socket.on('leave-room', (data) => {
      const { roomCode, playerId } = data;
      const host = db.removePlayerFromRoom(roomCode, socket.id);
      const user = db.getUser(playerId);
      leaveRoom(socket, roomCode, user, host);
   });

   socket.on('move-player', (data) => {
      const { roomCode, playerId, playerInfo } = data;
      const room = db.getRoom(roomCode);
      if (room) {
         // console.log("player is moving", playerId);
         db.setUserInfo(playerId, playerInfo);
         socket.broadcast.to(roomCode).emit('update-player', {
            playerId,
            playerInfo
         });
      }
   });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
