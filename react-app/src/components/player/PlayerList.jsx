import React, {Component} from 'react';
import PlayerListElement from "./PlayerListElement";

class PlayerList extends Component {
    render() {
        const {players} = this.props;

        return (
            <div className="player-list">
                {players.map((player) => {
                    return <PlayerListElement key={player.id} player={player} />
                })}
            </div>
        );
    }
}

export default PlayerList;
