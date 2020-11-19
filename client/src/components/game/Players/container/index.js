import { connect } from "react-redux";
import { loadCharacter } from "redux/slices/status.slice";
import Players from "components/game/Players/index";

const mapStateToProps = ({ multiplayer, character }) => {
  return {
    players: multiplayer.room.players
      .map(player => player.playerInfo)
      .filter(info => info.displayName !== character.displayName),
  };
};

const mapDispatch = { loadCharacter };

export default connect(mapStateToProps, mapDispatch)(Players);
