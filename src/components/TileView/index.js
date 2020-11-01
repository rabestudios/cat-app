import React, { useContext, useEffect } from "react";
import { MAP_DIMENSIONS, TILE_SIZE } from "constants/map";
import CanvasContext from "context/canvas.context";
import Grid from "components/Grid";
import Map from "components/Map/container";
import Character from "components/Character/container";
import Players from "components/Players/container";

const TileView = ({ gameStatus }) => {
  const width = MAP_DIMENSIONS * TILE_SIZE;
  const height = MAP_DIMENSIONS * TILE_SIZE;
  const ctx = useContext(CanvasContext);

  useEffect(() => {
    return () => {
      return () => ctx && ctx.clearRect(0, 0, ctx.width, ctx.height);
    };
  }, [ctx]);

  return (
    <>
      <>
        <Grid width={width} height={height}>
          <Map />
        </Grid>
      </>
      {gameStatus.mapLoaded && <Character />}
      {gameStatus.mapLoaded && <Players />}
    </>
  );
};

export default TileView;
