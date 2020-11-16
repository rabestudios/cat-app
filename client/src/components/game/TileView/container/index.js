import { connect } from "react-redux";
import TileView from "components/game/TileView/index";

const mapStateToProps = ({ gameStatus }) => ({ gameStatus });

export default connect(mapStateToProps)(TileView);
