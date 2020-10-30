import { createSlice } from '@reduxjs/toolkit';
import { CAT_COLOURS } from 'src/constants/character';

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    x: 6,
    y: 6,
    color: CAT_COLOURS.blue,
  },
});

export default characterSlice;
