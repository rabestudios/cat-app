import React from "react";
import Character from "components/game/Character";

const Players = ({ players, loadCharacter }) => {
  return (
    <>
      {players.map(player => (
        <Character
          key={player.displayName}
          color={player.color}
          x={player.x}
          y={player.y}
          loadCharacter={loadCharacter}
        />
      ))}
    </>
  );
};

export default Players;
