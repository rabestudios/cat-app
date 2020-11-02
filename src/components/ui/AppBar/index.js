import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #477bba;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  color: white;
`;

const AppBar = () => (
  <Container>Cats - it's like snakes but with cats</Container>
);

export default AppBar;
