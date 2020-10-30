import { combineReducers } from "redux";
import characterReducer from "../slices/character.slice";
import statusReducer from "../slices/status.slice";

export default combineReducers({
  character: characterReducer,
  gameStatus: statusReducer,
});
