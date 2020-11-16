import { connect } from "react-redux";
import Menu from "../index";
import {
  setPlayerName,
  setPlayerColor,
  setPlayerPosition,
} from "redux/slices/character.slice";
import { setIsUpdateRequired } from "redux/slices/status.slice";

const mapStateToProps = ({ character, multiplayer }) => ({
  character,
  players: multiplayer.room.players,
});

const mapDispatch = {
  setPlayerName,
  setPlayerColor,
  setPlayerPosition,
  setIsUpdateRequired,
};

export default connect(mapStateToProps, mapDispatch)(Menu);
