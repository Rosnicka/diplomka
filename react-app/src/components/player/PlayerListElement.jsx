import React from 'react';

const PlayerListElement = (props) => {
    const {player} = props;

    return (
        <div className="player-list-element">
            <div className="player-list-element__name">{player.first_name} {player.last_name}</div>
            <div className="player-list-element__number">{player.number}</div>
        </div>
    );
}

export default PlayerListElement;
