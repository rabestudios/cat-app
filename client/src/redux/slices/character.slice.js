import { createSlice } from "@reduxjs/toolkit";
import { CAT_COLOURS } from "constants/character";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    displayName: "myplayer",
    x: 6,
    y: 6,
    color: CAT_COLOURS.red,
  },
  reducers: {
    move(state, action) {
      const [x, y] = action.payload;
      state.x += x;
      state.y += y;
    },
    setPlayerName(state, action) {
      const name = action.payload;
      state.displayName = name;
    },
    setPlayerColor(state, action) {
      const color = action.payload;
      state.color = color;
    },
    setPlayerPosition(state, action) {
      const { x, y } = action.payload;
      state.x = x;
      state.y = y;
    },
  },
});

export const {
  move,
  setPlayerName,
  setPlayerColor,
  setPlayerPosition,
} = characterSlice.actions;

export default characterSlice.reducer;
