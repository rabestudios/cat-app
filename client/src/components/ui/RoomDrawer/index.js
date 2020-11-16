import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  Tooltip,
  List,
  Typography,
} from "@material-ui/core";
import { VideogameAsset } from "@material-ui/icons";
import RoomItem from "components/ui/RoomDrawer/RoomItem";

const rooms = [
  {
    code: "AXVSDD",
    players: ["me", "me", "me", "me", "me", "me", "me", "me", "me"],
    hostId: "",
  },
  {
    code: "AVCDDF",
    players: ["me"],
    hostId: "",
  },
];

const RoomDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = isOpen => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(isOpen);
  };

  return (
    <>
      <Tooltip title="Join a room">
        <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <VideogameAsset />
        </IconButton>
      </Tooltip>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" align="center" style={{ padding: 10 }}>
            Rooms Available
          </Typography>
          <List>
            {rooms.map(room => (
              <RoomItem key={room.code} room={room} />
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default RoomDrawer;
