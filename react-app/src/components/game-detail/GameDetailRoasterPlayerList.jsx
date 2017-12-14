import React from 'react';
import GameDetailRoasterPlayerElement from "./GameDetailRoasterPlayerElement";

const GameDetailRoasterPlayerList = (props) => {
    const {playersOnRoster, onClickRemovePlayerFromRoaster} = props;

    return (
        <div>
            {playersOnRoster.map((player, index) => {
                return <GameDetailRoasterPlayerElement key={index} player={player} onClickRemovePlayerFromRoaster={onClickRemovePlayerFromRoaster} />;
            })}
        </div>
    );
};

export default GameDetailRoasterPlayerList;