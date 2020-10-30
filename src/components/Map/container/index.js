import { connect } from "react-redux";
import { loadMap } from "app/slices/status.slice";
import Map from "../index";

const mapDispatch = { loadMap };

export default connect(null, mapDispatch)(Map);
