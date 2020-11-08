import React from "react";
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

const App = () => {
  useSocket(config.server.baseUrl);

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

export default App;
