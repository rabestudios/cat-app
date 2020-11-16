import React from "react";
import GameLoop from "components/game/GameLoop/container";
import TileView from "components/game/TileView/container";
import AppBar from "components/ui/AppBar";
import Menu from "components/ui/Menu/container";
import config from "config";
import useSocket from "hooks/useSocket";
import { GameContainer, BodyContainer } from "./styles";

const App = ({ character, updateUserList }) => {
  const socket = useSocket(config.server.baseUrl, character);

  if (socket) {
    socket.on("update-user-list", ({ users }) => {
      updateUserList(users);
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

export default App;
