import { connect } from "react-redux";
import { bufferImage } from "app/slices/character.slice";
import { loadCharacter } from "app/slices/status.slice";
import Character from "../index";

const mapStateToProps = state => ({ ...state.character });

const mapDispatch = { loadCharacter, bufferImage };

export default connect(mapStateToProps, mapDispatch)(Character);
