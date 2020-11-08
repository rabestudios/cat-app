const { ROOM_CODE_LENGTH, PLAYER_COLOURS } = require('./constants');

const generateCode = () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890';
    const chars = [];
    while (chars.length < ROOM_CODE_LENGTH) {
        const randomIdx = Math.random() * str.length;
        chars.push(str.charAt(randomIdx));
    }
    return chars.join('');
}

const getUniqueName = (room, player) => {
    const displayName = player.playerInfo.displayName;
    let newName = displayName;
    let count = 1;
    while(room.players.some(p => p.playerInfo.displayName === newName)) {
        newName = `${displayName} ${count}`;
        count++;
    }
    return newName;
}

const getUniqueColor = (room, player) => {
    const usedColors = room.players.map(p => p.playerInfo.color);
    if (usedColors.includes(player.playerInfo.color)) {
        const allColors = Object.keys(PLAYER_COLOURS).map(key => PLAYER_COLOURS[key]);
        const availColors = allColors.filter(color => !usedColors.includes(color));
        return availColors[0];
    }
    return player.playerInfo.color;
}

const getPlayerDetailsForRoom = (room, player) => {
    const displayName = getUniqueName(room, player);
    const color = getUniqueColor(room, player);
    return {
        displayName,
        color
    };
}

module.exports = {
    generateCode,
    getPlayerDetailsForRoom
}
