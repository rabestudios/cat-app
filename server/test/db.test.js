const db = require('../src/database')();
const { v4: uuidv4 } = require('uuid');
const { PLAYER_COLOURS } = require('../src/utils/constants');

const mockPlayers = [
    {displayName: 'chris', color: PLAYER_COLOURS.red},
    {displayName: 'jacq', color: PLAYER_COLOURS.black},
    {displayName: 'andrew', color: PLAYER_COLOURS.red}
]

for (const player of mockPlayers) {
    db.addUser(player, {id: uuidv4()});
}

const users = db.getUsers();
const host = users[0];
db.createRoom(host.id);
const rooms = db.getRooms();
const room = rooms[0];

for (let i = 1; i < users.length; i++) {
    const player = users[i];
    db.addPlayerToRoom(room.code, player.id);
}

db.removePlayerFromRoom(room.code, host.id);

console.log(db.getRoom(room.code));

