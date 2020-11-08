import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    mapLoaded: false,
    characterLoaded: false,
    socket: undefined
  },
  reducers: {
    loadMap(state, payload) {
      state.mapLoaded = payload;
    },
    loadCharacter(state, payload) {
      state.characterLoaded = payload;
    },
    connectToServer(state, payload) {
      const endpoint = payload;
      state.socket = socketIOClient(endpoint);
    }
  },
});

export const { loadCharacter, loadMap, connectToServer } = statusSlice.actions;

export default statusSlice.reducer;
