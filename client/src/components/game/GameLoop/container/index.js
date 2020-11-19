import { connect } from "react-redux";
import { move } from "redux/slices/character.slice";
import { setIsUpdateRequired } from "redux/slices/status.slice";

import GameLoop from "components/game/GameLoop/index";

const mapStateToProps = ({ character, gameStatus, multiplayer }) => ({
  character,
  isUpdateRequired: gameStatus.isUpdateRequired,
  isConnected: multiplayer.isConnected,
  roomCode: multiplayer.room.code,
});

const mapDispatch = { move, setIsUpdateRequired };

export default connect(mapStateToProps, mapDispatch)(GameLoop);
