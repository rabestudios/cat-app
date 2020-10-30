import { connect } from "react-redux";
import TileView from "../index";

const mapStateToProps = ({ gameStatus }) => ({ gameStatus });

export default connect(mapStateToProps)(TileView);
