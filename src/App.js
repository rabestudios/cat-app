import React from "react";
import GameLoop from "components/GameLoop/container";
import TileView from "components/TileView/container";

function App() {
  return (
    <div>
      <header />
      <main>
        <GameLoop>
          <TileView />
        </GameLoop>
      </main>
    </div>
  );
}

export default App;
