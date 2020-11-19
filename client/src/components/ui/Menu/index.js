import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  ButtonGroup,
  Grid,
} from "@material-ui/core";
import { CAT_COLOURS } from "constants/character";
import ColourButton from "components/ui/Menu/ColourButton";
import { SPAWN_COORDS } from "constants/map";
import useSocket from "hooks/useSocket";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const OptionsContainer = styled.div`
  padding: 20px 0px;
`;

const HeaderText = styled(Typography)`
  margin-bottom: 10px !important;
`;

const RoomInfoContainer = styled.div`
  margin-top: 20px;
`;

const Menu = ({
  character,
  players,
  setPlayerName,
  setPlayerColor,
  setPlayerPosition,
  setIsUpdateRequired,
  onlineUsers,
  isConnected,
  room,
}) => {
  const [isHost, setIsHost] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const socket = useSocket();

  const usedColours = players.map(p => p.color);

  const handleHostClick = useCallback(() => {
    if (!isConnected) {
      setIsHost(true);
      if (socket) {
        socket.emit("host-room", { hostId: socket.id });
      }
    }
  }, [isConnected, setIsHost, socket]);

  const handleJoinClick = useCallback(() => {
    setIsHost(false);
    setPlayerPosition(SPAWN_COORDS);
    setIsUpdateRequired(true);
    const playerInfo = { ...character, ...SPAWN_COORDS };
    if (socket && roomCode) {
      socket.emit("join-room", {
        playerId: socket.id,
        roomCode,
        playerInfo,
      });
    }
  }, [
    setIsHost,
    setPlayerPosition,
    setIsUpdateRequired,
    socket,
    character,
    roomCode,
  ]);

  const onlineUsersText =
    onlineUsers.length === 0
      ? "No users online"
      : onlineUsers.length > 1
      ? `There are ${onlineUsers.length} other users online`
      : `There is ${onlineUsers.length} other user online`;

  return (
    <MainContainer>
      <OptionsContainer>
        <HeaderText variant="h6">Player Details</HeaderText>
        <TextField
          label="Player Name"
          variant="outlined"
          size="small"
          value={character.displayName}
          onChange={e => setPlayerName(e.target.value)}
        />
        <Typography variant="body2" style={{ marginTop: 10 }}>
          Select Player Colour
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(CAT_COLOURS).map(key => {
            const colour = CAT_COLOURS[key];
            return (
              <Grid item xs={3} key={key}>
                <ColourButton
                  name={key}
                  colour={colour}
                  onClick={() => setPlayerColor(colour)}
                  isSelected={character.color === colour}
                  isUnavailable={usedColours.includes(colour)}
                />
              </Grid>
            );
          })}
        </Grid>
      </OptionsContainer>
      <OptionsContainer>
        <HeaderText variant="h6">Multiplayer</HeaderText>
        <Typography variant="body1">{onlineUsersText}</Typography>
        <Typography variant="body1">
          You are {isHost ? "hosting" : "joining"}
        </Typography>
        <ButtonGroup style={{ marginTop: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleHostClick}
            disabled={isConnected}
          >
            Host
          </Button>
          <Button
            disabled={isConnected}
            variant="contained"
            color="secondary"
            onClick={handleJoinClick}
          >
            Join
          </Button>
        </ButtonGroup>
        <RoomInfoContainer>
          <TextField
            label={isHost ? "Room Code" : "Enter Room Code"}
            variant="outlined"
            disabled={isHost || isConnected}
            size="small"
            style={{ marginBottom: 10 }}
            onChange={e => setRoomCode(e.target.value)}
            value={isConnected ? room.code : roomCode}
          />
          {!isHost && !isConnected && (
            <Button variant="contained">Confirm</Button>
          )}
          {isConnected && <Button variant="contained">Leave</Button>}
        </RoomInfoContainer>
      </OptionsContainer>
    </MainContainer>
  );
};

export default Menu;
