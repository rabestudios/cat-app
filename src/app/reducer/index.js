import { combineReducers } from "@reduxjs/toolkit";
import characterReducer from "../slices/character.slice";
import statusReducer from "../slices/status.slice";
import multiplayerReducer from "../slices/multiplayer.slice";

export default combineReducers({
  character: characterReducer,
  gameStatus: statusReducer,
  multiplayer: multiplayerReducer,
});
