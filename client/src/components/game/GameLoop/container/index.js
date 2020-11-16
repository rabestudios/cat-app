import { connect } from "react-redux";
import { move } from "redux/slices/character.slice";
import { setIsUpdateRequired } from "redux/slices/status.slice";

import GameLoop from "components/game/GameLoop/index";

const mapStateToProps = ({ character, gameStatus }) => ({
  character,
  isUpdateRequired: gameStatus.isUpdateRequired,
});

const mapDispatch = { move, setIsUpdateRequired };

export default connect(mapStateToProps, mapDispatch)(GameLoop);
