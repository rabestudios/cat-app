import { connect } from "react-redux";
import { move } from "app/slices/character.slice";
import GameLoop from "components/game/GameLoop/index";

const mapStateToProps = ({ character }) => ({ character });

const mapDispatch = { move };

export default connect(mapStateToProps, mapDispatch)(GameLoop);