import { connect } from "react-redux";
import {
  updateUserList,
  removeUser,
  updateRoomList,
  removeRoom,
  setIsConnected,
  setRoom
} from "redux/slices/multiplayer.slice";
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
  setRoom
};

export default connect(mapStateToProps, mapDispatch)(App);
