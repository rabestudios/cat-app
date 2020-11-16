import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import RoomDrawer from "components/ui/RoomDrawer";

const MainContainer = styled(MuiAppBar)`
  background-color: #477bba !important;
`;

const AppBar = () => (
  <MainContainer
    position="static"
    color="primary"
    classes={{ root: "mui-root" }}
  >
    <Toolbar>
      <Typography variant="h6">
        Cats - it's like snakes but with cats
      </Typography>
      <div style={{ marginLeft: "auto" }}>
        <RoomDrawer />
      </div>
    </Toolbar>
  </MainContainer>
);

export default AppBar;
