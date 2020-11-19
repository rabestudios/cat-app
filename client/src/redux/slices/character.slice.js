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
    setPlayerInfo(state, action) {
      const newInfo = action.payload;
      state.x = newInfo.x;
      state.y = newInfo.y;
      state.displayName = newInfo.displayName;
      state.color = newInfo.color;
    }
  },
});

export const {
  move,
  setPlayerName,
  setPlayerColor,
  setPlayerPosition,
  setPlayerInfo
} = characterSlice.actions;

export default characterSlice.reducer;
