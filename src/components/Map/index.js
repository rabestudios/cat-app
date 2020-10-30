import { useContext, useEffect } from "react";
import CanvasContext from "context/canvas.context";
import {
  LAYERS,
  MAP_DIMENSIONS,
  MAP_TILE_TYPES,
  TILE_SIZE,
} from "constants/map";

const Map = ({ loadMap }) => {
  const ctx = useContext(CanvasContext);
  const { COLS, ROWS } = MAP_DIMENSIONS;

  useEffect(() => {
    console.log("map effect");
    const drawLayer = grid => {
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const item = grid[i][j];
          if (!item) {
            continue; // empty tile
          }
          const x = j * TILE_SIZE;
          const y = i * TILE_SIZE;
          const tile = MAP_TILE_TYPES[item];
          if (ctx) {
            ctx.fillStyle = tile.color;
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    };

    for (const layer of LAYERS) {
      drawLayer(layer);
    }
    loadMap(true);
  }, [COLS, ROWS, ctx, loadMap]);
  return null;
};

export default Map;
