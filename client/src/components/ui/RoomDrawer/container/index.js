import { connect } from "react-redux";
import RoomDrawer from "../index";

const mapStateToProps = ({ multiplayer }) => ({
  rooms: multiplayer.onlineRooms
});

export default connect(mapStateToProps)(RoomDrawer);
