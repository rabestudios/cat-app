import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    mapLoaded: false,
    characterLoaded: false,
    isUpdateRequired: false,
  },
  reducers: {
    loadMap(state, action) {
      state.mapLoaded = action.payload;
    },
    loadCharacter(state, action) {
      state.characterLoaded = action.payload;
    },
    setIsUpdateRequired(state, action) {
      state.isUpdateRequired = action.payload;
    },
  },
});

export const {
  loadCharacter,
  loadMap,
  setIsUpdateRequired,
} = statusSlice.actions;

export default statusSlice.reducer;
