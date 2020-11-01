import { createSlice } from "@reduxjs/toolkit";
import { CAT_COLOURS } from "constants/character";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    id: "myplayer",
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
  },
});

export const { move } = characterSlice.actions;

export default characterSlice.reducer;
