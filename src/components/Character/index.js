import React, { useContext, useEffect, useRef } from "react";
import { CAT_SPRITE } from "constants/character";
import CanvasContext from "context/canvas.context";
import { TILE_SIZE } from "constants/map";

const Character = ({ x, y, color, charImg, loadCharacter, bufferImage }) => {
  const ctx = useContext(CanvasContext);
  const imgRef = useRef(null);

  useEffect(() => {
    if (charImg && ctx) {
      const radius = TILE_SIZE / 4;
      const offset = radius * 2;
      const imageX = x * TILE_SIZE + offset;
      const imageY = y * TILE_SIZE + offset;

      // left ear
      ctx.beginPath();
      ctx.moveTo(imageX - TILE_SIZE / 4, imageY - TILE_SIZE / 3);
      ctx.lineTo(imageX + 10, imageY + 5);
      ctx.lineTo(imageX - 10, imageY);
      ctx.fillStyle = color;
      ctx.fill();

      // // right ear
      ctx.beginPath();
      ctx.moveTo(imageX + TILE_SIZE / 4, imageY - TILE_SIZE / 3);
      ctx.lineTo(imageX + 10, imageY + 5);
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
  }, [ctx, charImg, x, y, loadCharacter, color]);

  return (
    <img
      id="character"
      alt="character"
      ref={imgRef}
      onLoad={() => bufferImage(`#${imgRef.current.id}`)}
      className="images-buffer"
      src={CAT_SPRITE}
      style={{ display: "none" }}
    />
  );
};

export default Character;
