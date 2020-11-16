import { connect } from "react-redux";
import { updateUserList, removeUser } from "redux/slices/multiplayer.slice";
import App from "../index";

const mapStateToProps = ({ character }) => ({
  character,
});

const mapDispatch = { updateUserList, removeUser };

export default connect(mapStateToProps, mapDispatch)(App);
