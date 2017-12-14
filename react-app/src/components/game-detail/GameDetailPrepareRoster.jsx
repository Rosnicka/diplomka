import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'
import GameDetailRoasterPlayerList from "./GameDetailRoasterPlayerList";

const GameDetailPrepareRoster = (props) => {
    const {myPlayers, playersOnRoster, onSelectAddPlayer, onClickRemovePlayerFromRoaster} = props;
    const playersOptions = myPlayers.filter((player) => {
        const playerFoundOnRoaster = playersOnRoster.find((playerOnRoster) => {
            return playerOnRoster.id === player.id
        });
        return playerFoundOnRoaster === undefined
    });

    return (
        <div>
            <DropdownButton  bsStyle="success" title='Přidat hráče do soupisky' id={'select-player'}
                             onSelect={(key) => onSelectAddPlayer(key)}>
                {playersOptions.map((player, index) => {
                    return <MenuItem key={player.id} eventKey={player.id}>{player.first_name} {player.last_name}</MenuItem>
                })}
            </DropdownButton>
            <GameDetailRoasterPlayerList playersOnRoster={playersOnRoster} onClickRemovePlayerFromRoaster={onClickRemovePlayerFromRoaster}/>
        </div>
    );
};

export default GameDetailPrepareRoster;
