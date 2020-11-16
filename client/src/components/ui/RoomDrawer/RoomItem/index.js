import React from "react";
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

const RoomItem = ({ room }) => {
  let avatarStyle = {
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

  return (
    <ListItem style={{ width: 300 }}>
      <ListItemAvatar>
        <Avatar style={avatarStyle}>
          {room.players.length}/{MAX_PLAYERS}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>{room.code}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton>
          <PlayArrow />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RoomItem;
