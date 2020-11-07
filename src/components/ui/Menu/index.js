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
  multiplayer,
  setPlayerName,
  setPlayerColor,
  setRoomCode,
}) => {
  const [isHost, setIsHost] = useState(false);

  const usedColours = multiplayer.players.map(p => p.color);

  const handleHostClick = useCallback(() => {
    setRoomCode("");
    setIsHost(true);
  }, [setIsHost, setRoomCode]);

  const handleJoinClick = useCallback(() => {
    setIsHost(false);
  }, [setIsHost]);

  return (
    <MainContainer>
      <OptionsContainer>
        <HeaderText variant="h6">Player Details</HeaderText>
        <TextField
          label="Player Name"
          variant="outlined"
          size="small"
          value={character.id}
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
        <Typography variant="body1">
          You are {isHost ? "hosting" : "joining"}
        </Typography>
        <ButtonGroup style={{ marginTop: 10 }}>
          <Button variant="contained" color="primary" onClick={handleHostClick}>
            Host
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleJoinClick}
          >
            Join
          </Button>
        </ButtonGroup>
        <RoomInfoContainer>
          <Typography variant="body2">
            {isHost ? "Room Code" : "Enter Room Code"}
          </Typography>
          <TextField
            label="Room Code"
            variant="outlined"
            disabled={isHost}
            size="small"
            style={{ marginBottom: 10 }}
            onChange={e => setRoomCode(e.target.value)}
            value={multiplayer.roomCode}
          />
          {!isHost && <Button variant="contained">Confirm</Button>}
        </RoomInfoContainer>
      </OptionsContainer>
    </MainContainer>
  );
};

export default Menu;
