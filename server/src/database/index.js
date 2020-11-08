const { generateCode, getPlayerDetailsForRoom } = require('../utils/helper');

class Database {
    constructor() {
        this.users = [];
        this.rooms = [];
    }

    getUsers() {
        return this.users;
    }

    getUser(userId) {
        const userIdx = this.users.findIndex(p => p.id === userId);
        if (userIdx >= 0) {
            return this.users[userIdx];
        }
        return undefined;
    }

    addUser(player, socket) {
        const user = {
            id: socket.id,
            playerInfo: player,
            socket
        }
        this.users.push(user);
        return user;
    }

    disconnectUser(userId) {
        const delIdx = this.users.findIndex(user => user.id === userId);
        if (delIdx >= 0) {
            this.users.splice(delIdx, 1);
        }
    }

    getRooms() {
        return this.rooms;
    }

    getRoom(roomCode) {
        const roomIdx = this.rooms.findIndex(room => room.code === roomCode);
        if (roomIdx >= 0) {
            return this.rooms[roomIdx];
        }
        return undefined;
    }

    createRoom(hostId) {
        const code = generateCode();
        const host = this.getUser(hostId);
        const players = [host];
        const room = {
            code,
            players,
            hostId
        }
        this.rooms.push(room);
        return room;
    }

    addPlayerToRoom(roomCode, playerId) {
        const room = this.getRoom(roomCode);
        if (room) {
            const player = this.getUser(playerId);
            const newDetails = getPlayerDetailsForRoom(room, player);
            player.playerInfo.displayName = newDetails.displayName;
            player.playerInfo.color = newDetails.color;
            room.players.push(player);
            return {
                newDetails,
                room
            };
        }
        return undefined;
    }

    removePlayerFromRoom(roomCode, playerId) {
        const roomIdx = this.rooms.findIndex(room => room.code === roomCode);
        if (roomIdx >= 0) {
            const room = this.rooms[roomIdx];
            // remove player from list of players
            const playerIdx = room.players.findIndex(user => user.id === playerId);
            if (playerIdx >= 0) {
                room.players.splice(playerIdx, 1);
            }
            // decommission room if no more players
            if (room.players.length === 0) {
                this.rooms.splice(roomIdx, 1);
                return;
            } else if (room.hostId === playerId) {
                // reassign host
                room.hostId = room.players[0].id;
            }
            this.rooms[roomIdx] = room;
        }
        // update player display name
        const player = this.getUser(playerId);
        player.playerInfo.displayName = player.id;
        return player;
    }
}

module.exports = () => {
    return new Database();
}
