import React from "react";
import GameLoop from "components/game/GameLoop/container";
import TileView from "components/game/TileView/container";
import AppBar from "components/ui/AppBar";
import Menu from "components/ui/Menu/container";
import config from "config";
import useSocket from "hooks/useSocket";
import { GameContainer, BodyContainer } from "./styles";

const App = ({
  character,
  updateUserList,
  removeUser,
  updateRoomList,
  removeRoom,
  setIsConnected,
  setRoom,
  setPlayerInfo,
  setIsUpdateRequired,
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
  updateRoomPlayerInfo,
}) => {
  const socket = useSocket(config.server.baseUrl, character);

  if (socket) {
    socket.on("update-user-list", ({ users }) => {
      updateUserList(users);
    });

    socket.on("update-room-list", ({ rooms }) => {
      updateRoomList(rooms);
    });

    socket.on("disconnect-user", ({ socketId }) => {
      removeUser(socketId);
      removePlayerFromRoom(socketId);
    });

    socket.on("remove-room", ({ roomCode }) => {
      removeRoom(roomCode);
    });

    socket.on("set-connection", ({ isConnected, room, playerInfo }) => {
      setIsConnected(isConnected);
      setRoom(room);
      setPlayerInfo(playerInfo);
      setIsUpdateRequired(true);
    });

    socket.on("room-connect", ({ player }) => {
      if (player.id !== socket.id) {
        addPlayerToRoom(player);
        setIsUpdateRequired(true);
      }
    });

    socket.on("room-disconnect", ({ playerId, host }) => {
      removePlayerFromRoom(playerId);
      setRoomHost(host);
      if (host === socket.id) {
        setIsHost(true);
      }
      setIsUpdateRequired(true);
    });

    socket.on("update-player", ({ playerId, playerInfo }) => {
      updateRoomPlayerInfo({ playerId, playerInfo });
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
