import { connect } from "react-redux";
import Menu from "../index";
import { setPlayerName, setPlayerColor } from "app/slices/character.slice";
import { setRoomCode } from "app/slices/multiplayer.slice";

const mapStateToProps = ({ character, multiplayer }) => ({
  character,
  multiplayer,
});

const mapDispatch = { setPlayerName, setPlayerColor, setRoomCode };

export default connect(mapStateToProps, mapDispatch)(Menu);
