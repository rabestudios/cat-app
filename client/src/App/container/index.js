import { connect } from "react-redux";
import {
  updateUserList,
  removeUser,
  updateRoomList,
  removeRoom,
  setIsConnected,
  setRoom,
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
} from "redux/slices/multiplayer.slice";
import { setPlayerInfo } from "redux/slices/character.slice";
import { setIsUpdateRequired } from "redux/slices/status.slice";
import App from "../index";

const mapStateToProps = ({ character }) => ({
  character,
});

const mapDispatch = {
  updateUserList,
  removeUser,
  updateRoomList,
  removeRoom,
  setIsConnected,
  setRoom,
  setPlayerInfo,
  setIsUpdateRequired,
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
};

export default connect(mapStateToProps, mapDispatch)(App);
