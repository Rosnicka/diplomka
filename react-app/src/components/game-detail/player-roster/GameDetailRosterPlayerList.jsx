import React from 'react';
import GameDetailRosterPlayerElement from "./GameDetailRosterPlayerElement";

const GameDetailRosterPlayerList = (props) => {
    const {playersOnRoster, onClickRemovePlayerFromRoaster} = props;

    return (
        <div>
            {playersOnRoster.map((player, index) => {
                return <GameDetailRosterPlayerElement key={index} player={player} onClickRemovePlayerFromRoaster={onClickRemovePlayerFromRoaster} />;
            })}
        </div>
    );
};

export default GameDetailRosterPlayerList;