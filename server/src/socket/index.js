const joinRoom = (socket, room, user) => {
    socket.join(room.code);
    console.log(`socket (${socket.id}) joined room (${room.code})`);
    socket.broadcast.emit('update-user-list', { users: [user] })
    socket.emit('set-connection', { isConnected: true, room, playerInfo: user.playerInfo });
    socket.broadcast.to(room.code).emit('room-connect', {
        player: user
    });
};

const leaveRoom = (socket, roomCode, player) => {
    console.log(`socket(${socket.id}) left the room(${roomCode})`);
    socket.leave(roomCode);
    const roomsCount = socket.rooms.size;
    console.log(`socket room count: ${roomsCount}`);
    socket.broadcast.to(roomCode).emit('room-disconnect', {
        player: player
    });
};


module.exports = {
    joinRoom,
    leaveRoom
}
