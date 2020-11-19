import { connect } from "react-redux";
import Menu from "../index";
import {
  setPlayerName,
  setPlayerColor,
  setPlayerPosition,
} from "redux/slices/character.slice";
import { setIsUpdateRequired } from "redux/slices/status.slice";
import { setIsHost, disconnectFromRoom } from "redux/slices/multiplayer.slice";

const mapStateToProps = ({ character, multiplayer }) => ({
  character,
  players: multiplayer.room.players,
  onlineUsers: multiplayer.onlineUsers,
  isConnected: multiplayer.isConnected,
  room: multiplayer.room,
  isHost: multiplayer.isHost,
});

const mapDispatch = {
  setPlayerName,
  setPlayerColor,
  setPlayerPosition,
  setIsUpdateRequired,
  setIsHost,
  disconnectFromRoom
};

export default connect(mapStateToProps, mapDispatch)(Menu);
