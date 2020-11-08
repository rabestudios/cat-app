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
// io.use((socket, next) => {
//    const handshakeData = socket.request;
//    console.log('middleware', handshakeData._query['foo']);
//    console.log('middleware', handshakeData._query['baz']);
//    next();
// });

io.on('connection', socket => {
   console.log('user connected', socket.id);

   socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
   });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
