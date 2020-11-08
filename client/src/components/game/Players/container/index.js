import { connect } from "react-redux";
import { loadCharacter } from "app/slices/status.slice";
import Players from "components/game/Players/index";

const mapStateToProps = state => ({ ...state.multiplayer });

const mapDispatch = { loadCharacter };

export default connect(mapStateToProps, mapDispatch)(Players);
