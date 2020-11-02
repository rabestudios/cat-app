import React from "react";
import GameLoop from "components/game/GameLoop/container";
import TileView from "components/game/TileView/container";
import AppBar from "components/ui/AppBar";
import styled from "styled-components";

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

function App() {
  return (
    <>
      <header />
      <main>
        <AppBar />
        <GameContainer>
          <GameLoop>
            <TileView />
          </GameLoop>
        </GameContainer>
      </main>
    </>
  );
}

export default App;
