import { connect } from "react-redux";
import { loadCharacter } from "app/slices/status.slice";
import Character from "../index";

const mapStateToProps = state => ({ ...state.character });

const mapDispatch = { loadCharacter };

export default connect(mapStateToProps, mapDispatch)(Character);
