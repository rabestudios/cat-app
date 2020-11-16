import { createSlice } from "@reduxjs/toolkit";

const multiplayerSlice = createSlice({
  name: "multiplayer",
  initialState: {
    onlineUsers: [],
    isConnected: false,
    room: {
      code: "",
      players: [],
      hostId: undefined,
    },
  },
  reducers: {
    setRoom(state, action) {
      state.room = action.payload;
    },
    updateUserList(state, action) {
      const onlineUsers = state.onlineUsers;
      const serverUsers = action.payload;
      // add new users
      for (const sUser of serverUsers) {
        if (!onlineUsers.find(oUser => oUser.id === sUser.id)) {
          state.onlineUsers.push(sUser);
        }
      }
    },
    removeUser(state, action) {
      const userID = action.payload;
      const uIdx = state.onlineUsers.findIndex(user => user.id === userID);
      if (uIdx >= 0) {
        state.onlineUsers.splice(uIdx, 1);
      }
    }
  },
});

export const { setRoom, updateUserList, removeUser } = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
