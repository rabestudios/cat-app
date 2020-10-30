import { createSlice } from "@reduxjs/toolkit";
import { CAT_COLOURS } from "constants/character";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    x: 6,
    y: 6,
    color: CAT_COLOURS.blue,
    charImg: null,
  },
  reducers: {
    move(state, action) {
      const [x, y] = action.payload;
      state.x += x;
      state.y += y;
    },
    bufferImage(state, action) {
      state.charImg = action.payload;
    },
  },
});

export const { move, bufferImage } = characterSlice.actions;

export default characterSlice.reducer;
