import React from 'react';
import {Label, Button} from 'react-bootstrap'
import GameDetailRosterPlayerList from "./GameDetailRosterPlayerList";
import GameDetailRosterAddPlayer from "./GameDetailRosterAddPlayer";
import {GAME_STATE_FILLING_ROSTER, ROSTER_CONFIRM_PLAYER_COUNT_LIMIT} from "../../../constants/GameStateTypes";

const GameDetailRoster = (props) => {
    const {isCaptain, gameState, onClickConfirmRoster, playersOnRoster, gameHeader} = props;

    const renderAddPlayer = () => {
        if (gameState !== GAME_STATE_FILLING_ROSTER) {
            return '';
        }

        if (!isCaptain) {
            return (
                <Label bsStyle="warning">
                    Nejste kapitán tohoto týmu
                </Label>
            )
        } else {
            return <GameDetailRosterAddPlayer {...props}/>
        }
    }

    const renderConfirmRoster = () => {
        if (gameState !== GAME_STATE_FILLING_ROSTER || !isCaptain) {
            return '';
        }

        if (playersOnRoster.length < ROSTER_CONFIRM_PLAYER_COUNT_LIMIT) {
            return (
                <div>
                    <Button disabled>Potvrdit soupisku</Button>
                    <Label bsStyle="warning">Je potřeba minimálně {ROSTER_CONFIRM_PLAYER_COUNT_LIMIT} hráčů.</Label>
                </div>
            )
        }

        console.log(gameHeader.id);

        return <Button bsStyle="success" onClick={() => onClickConfirmRoster(gameHeader.id)}>Potvrdit soupisku</Button>;
    }

    return (
        <div>
            {renderAddPlayer()}
            <GameDetailRosterPlayerList {...props} />
            {renderConfirmRoster()}
        </div>
    );
};

export default GameDetailRoster;
