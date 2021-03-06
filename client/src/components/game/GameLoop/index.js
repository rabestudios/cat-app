import { useCallback, useEffect, useRef, useState } from "react";
import { MAP_DIMENSIONS, MOVE_DIRECTIONS, TILE_SIZE } from "constants/map";
import { checkMapCollision } from "utils";
import CanvasContext from "context/canvas.context";
import useSocket from "hooks/useSocket";

const GameLoop = ({
  children,
  character,
  roomCode,
  isConnected,
  move,
  setIsUpdateRequired,
  isUpdateRequired,
}) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const loopRef = useRef();
  const socket = useSocket();

  const width = MAP_DIMENSIONS.COLS * TILE_SIZE;
  const height = MAP_DIMENSIONS.ROWS * TILE_SIZE;

  const moveCharacter = useCallback(
    e => {
      const key = e.key;
      if (MOVE_DIRECTIONS[key]) {
        const [x, y] = MOVE_DIRECTIONS[key];
        const isColliding = checkMapCollision(character.x + x, character.y + y);
        if (!isColliding) {
          setIsUpdateRequired(true);
          move([x, y]);
          // emit event
          if (isConnected && socket) {
            const playerInfo = {
              ...character,
              x: character.x + x,
              y: character.y + y,
            };
            socket.emit("move-player", {
              playerId: socket.id,
              playerInfo,
              roomCode,
            });
          }
        }
      }
    },
    [move, character, setIsUpdateRequired, socket, isConnected, roomCode],
  );

  const tick = useCallback(() => {
    if (isUpdateRequired) {
      setIsVisible(false);
      setIsVisible(true);
      setIsUpdateRequired(false);
    }
    loopRef.current = requestAnimationFrame(tick);
  }, [isUpdateRequired, setIsVisible, setIsUpdateRequired]);

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
  }, [setCtx]);

  useEffect(() => {
    loopRef.current = requestAnimationFrame(tick);
    return () => {
      loopRef.current && cancelAnimationFrame(loopRef.current);
    };
  }, [loopRef, tick]);

  useEffect(() => {
    document.addEventListener("keypress", moveCharacter);
    return () => {
      document.removeEventListener("keypress", moveCharacter);
    };
  }, [moveCharacter]);

  return (
    <CanvasContext.Provider value={ctx}>
      <canvas ref={canvasRef} width={width} height={height} />
      {isVisible && children}
    </CanvasContext.Provider>
  );
};

export default GameLoop;
