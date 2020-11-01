import React, { useContext, useEffect } from "react";
import CanvasContext from "context/canvas.context";
import { TILE_SIZE } from "constants/map";

const Character = ({ x, y, color, loadCharacter }) => {
  const ctx = useContext(CanvasContext);

  useEffect(() => {
    if (ctx) {
      const radius = TILE_SIZE / 4;
      const offset = radius * 2;
      const imageX = x * TILE_SIZE + offset;
      const imageY = y * TILE_SIZE + offset;

      // left ear
      ctx.beginPath();
      ctx.moveTo(imageX - TILE_SIZE / 4, imageY - TILE_SIZE / 3);
      ctx.lineTo(imageX + 10, imageY + 5);
      ctx.lineTo(imageX - TILE_SIZE / 4, imageY);
      ctx.fillStyle = color;
      ctx.fill();

      // right ear
      ctx.beginPath();
      ctx.moveTo(imageX + TILE_SIZE / 4, imageY - TILE_SIZE / 3);
      ctx.lineTo(imageX + TILE_SIZE / 4, imageY);
      ctx.lineTo(imageX, imageY);
      ctx.fillStyle = color;
      ctx.fill();

      // face
      ctx.beginPath();
      ctx.arc(imageX, imageY, radius, 90, 360);
      ctx.fillStyle = color;
      ctx.fill();
      loadCharacter(true);
    }
  }, [ctx, x, y, loadCharacter, color]);

  return <div />;
};

export default Character;
