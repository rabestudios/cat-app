import { connect } from "react-redux";
import { updateUserList } from "redux/slices/multiplayer.slice";
import App from "../index";

const mapStateToProps = ({ character }) => ({
  character,
});

const mapDispatch = { updateUserList };

export default connect(mapStateToProps, mapDispatch)(App);
