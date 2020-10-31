import { useContext, useEffect } from "react";
import CanvasContext from "context/canvas.context";
import { TILE_SIZE } from "constants/map";

const Grid = ({ width, height, children }) => {
  const ctx = useContext(CanvasContext);
  useEffect(() => {
    if (ctx) {
      for (let i = 0; i < height; i++) {
        const y = i * TILE_SIZE;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let j = 0; j < width; j++) {
        const x = j * TILE_SIZE;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    }
  }, [ctx, height, width]);

  return children;
};

export default Grid;
