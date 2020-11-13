import React from "react";
import { connect } from "react-redux";
import GameLoop from "components/game/GameLoop/container";
import TileView from "components/game/TileView/container";
import AppBar from "components/ui/AppBar";
import styled from "styled-components";
import Menu from "components/ui/Menu/container";
import config from "config";
import useSocket from "hooks/useSocket";

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const BodyContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: row;
`;

const App = ({character}) => {
  const data = {
    displayName: character.displayName,
    color: character.color
  };

  const socket = useSocket(config.server.baseUrl, data);

  if (socket) {
    socket.on('update-user-list', ({users}) => {
      console.log(users);
    });
  }


  return (
    <>
      <header />
      <main>
        <AppBar />
        <BodyContainer>
          <Menu />
          <GameContainer>
            <GameLoop>
              <TileView />
            </GameLoop>
          </GameContainer>
        </BodyContainer>
      </main>
    </>
  );
};

const mapStateToProps = ({character}) => ({
  character
});

export default connect(mapStateToProps)(App);
