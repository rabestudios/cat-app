import { connect } from "react-redux";
import { setPlayerPosition } from "redux/slices/character.slice";
import { setIsUpdateRequired } from "redux/slices/status.slice";
import RoomItem from "../index";

const mapStateToProps = ({ character, multiplayer }) => ({
  character,
  isConnected: multiplayer.isConnected,
});

const mapDispatch = {
  setPlayerPosition,
  setIsUpdateRequired,
};

export default connect(mapStateToProps, mapDispatch)(RoomItem);
