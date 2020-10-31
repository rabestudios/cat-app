import React from "react";
import GameLoop from "components/GameLoop/container";
import TileView from "components/TileView/container";

function App() {
  return (
    <div>
      <header />
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <GameLoop>
            <TileView />
          </GameLoop>
        </div>
      </main>
    </div>
  );
}

export default App;
