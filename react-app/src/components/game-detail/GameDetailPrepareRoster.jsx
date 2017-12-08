import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'

const GameDetailPrepareRoster = (props) => {
    const {players, playersOnRoster} = props;

    const playersOptions = players.filter((player) => {
        const playerFoundOnRoaster = playersOnRoster.find((playerOnRoster) => {
            return playerOnRoster.id === player.id
        });

        return playerFoundOnRoaster === false
    })

    return (
        <div>
            <DropdownButton  bsStyle="default" title='test' id={'select-player'}
                             onSelect={(key) => console.log(key)}>
                {playersOptions.map((player, index) => {
                    return <MenuItem key={player.id} eventKey={player.id}>{player.first_name} {player.last_name}</MenuItem>
                })}
            </DropdownButton>
        </div>
    );
};

export default GameDetailPrepareRoster;
