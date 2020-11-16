import { createSlice } from "@reduxjs/toolkit";

const multiplayerSlice = createSlice({
  name: "multiplayer",
  initialState: {
    onlineUsers: [],
    onlineRooms: [],
    isConnected: false,
    room: {
      code: "",
      players: [],
      hostId: undefined,
    },
  },
  reducers: {
    setIsConnected(state, action) {
      state.isConnected = action.payload;
    },
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
    },
    updateRoomList(state, action) {
      const onlineRooms = state.onlineRooms;
      const serverRooms = action.payload;
      // add new rooms
      for (const sRoom of serverRooms) {
        const roomIdx = onlineRooms.findIndex(
          oRoom => oRoom.code === sRoom.code,
        );
        if (roomIdx === -1) {
          state.onlineRooms.push(sRoom);
        } else {
          state.onlineRooms[roomIdx] = sRoom;
        }
      }
    },
    removeRoom(state, action) {
      const roomCode = action.payload;
      const rIdx = state.onlineRooms.findIndex(room => room.code === roomCode);
      state.onlineRooms.splice(rIdx, 1);
    },
  },
});

export const {
  setRoom,
  updateUserList,
  removeUser,
  updateRoomList,
  removeRoom,
  setIsConnected
} = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
