import React, { useCallback } from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import { CAT_COLOURS, MAX_PLAYERS } from "constants/character";
import { SPAWN_COORDS } from "constants/map";
import useSocket from "hooks/useSocket";

const RoomItem = ({
  room,
  character,
  isConnected,
  setPlayerPosition,
  setIsUpdateRequired,
}) => {
  const socket = useSocket();

  const avatarStyle = {
    fontSize: 15,
    color: "#000",
    background: CAT_COLOURS.lime,
  };

  const quarter = MAX_PLAYERS / 4;
  const half = MAX_PLAYERS / 2;

  if (room.players.length >= quarter) {
    avatarStyle.background = CAT_COLOURS.green;
  }

  if (room.players.length >= half) {
    avatarStyle.background = CAT_COLOURS.orange;
  }
  if (room.players.length >= half + quarter) {
    avatarStyle.background = CAT_COLOURS.red;
  }

  if (room.players === MAX_PLAYERS) {
    avatarStyle.background = CAT_COLOURS.black;
  }

  const handleJoinClick = useCallback(() => {
    setPlayerPosition(SPAWN_COORDS);
    setIsUpdateRequired(true);
    const playerInfo = { ...character, ...SPAWN_COORDS };
    socket.emit("join-room", {
      playerId: socket.id,
      roomCode: room.code,
      playerInfo,
    });
  }, [setPlayerPosition, setIsUpdateRequired, socket, character, room]);

  return (
    <ListItem style={{ width: 300 }}>
      <ListItemAvatar>
        <Avatar style={avatarStyle}>
          {room.players.length}/{MAX_PLAYERS}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>{room.code}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton disabled={isConnected} onClick={handleJoinClick}>
          <PlayArrow />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RoomItem;
