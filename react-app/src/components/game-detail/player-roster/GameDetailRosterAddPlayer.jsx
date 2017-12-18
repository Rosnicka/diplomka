import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'

const GameDetailRosterAddPlayer = (props) => {

    const {myPlayers, playersOnRoster, onSelectAddPlayer} = props;

    const getPlayerSelectOptions = () => {
        return myPlayers.filter((player) => {
            const playerFoundOnRoaster = playersOnRoster.find((playerOnRoster) => {
                return playerOnRoster.id === player.id
            });
            return playerFoundOnRoaster === undefined
        });
    }

    const renderDropdownButton = () => {
        if (myPlayers === undefined || playersOnRoster === undefined) {
            return '';
        }

        const playersOptions = getPlayerSelectOptions();
        if (playersOptions.length === 0) {
            return (
                <div className="alert alert-info">
                    Nejsou k dispozici další hráči.
                </div>
            );
        }

        return (
            <DropdownButton bsStyle="success" title='Přidat hráče do soupisky' id={'select-player'}
                            onSelect={(key) => onSelectAddPlayer(key)}>
                {playersOptions.map((player) => {
                    return (
                        <MenuItem key={player.id} eventKey={player.id}>
                            {player.first_name} {player.last_name}
                        </MenuItem>
                    )
                })}
            </DropdownButton>
        )
    }

    return (
        <div>
            {renderDropdownButton()}
        </div>
    );
};

export default GameDetailRosterAddPlayer;
