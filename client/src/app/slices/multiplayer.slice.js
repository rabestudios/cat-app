import { createSlice } from "@reduxjs/toolkit";
import { CAT_COLOURS } from "constants/character";

const multiplayerSlice = createSlice({
  name: "multiplayer",
  initialState: {
    roomCode: "",
    players: [
      {
        displayName: "player2",
        x: 1,
        y: 1,
        color: CAT_COLOURS.blue,
      },
      {
        displayName: "player3",
        x: 2,
        y: 1,
        color: CAT_COLOURS.black,
      },
    ],
  },
  reducers: {
    addPlayer(state, action) {
      state.players.push(action.payload);
    },
    removePlayer(state, action) {
      const { id } = action.payload;
      const delIdx = state.players.findIndex(player => player.id === id);
      if (delIdx >= 0) {
        state.players.splice(delIdx, 1);
      }
    },
    setRoomCode(state, action) {
      state.roomCode = action.payload;
    },
  },
});

export const {
  addPlayer,
  removePlayer,
  setRoomCode,
} = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
