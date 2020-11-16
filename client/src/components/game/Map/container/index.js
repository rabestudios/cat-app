import { connect } from "react-redux";
import { loadMap } from "redux/slices/status.slice";
import Map from "components/game/Map/index";

const mapDispatch = { loadMap };

export default connect(null, mapDispatch)(Map);
