import React from 'react';
import {Label} from 'react-bootstrap'
import GameDetailRosterPlayerList from "./GameDetailRosterPlayerList";
import GameDetailRosterAddPlayer from "./GameDetailRosterAddPlayer";
import {GAME_STATE_FILLING_ROSTER} from "../../../constants/GameStateTypes";

const GameDetailRoster = (props) => {
    const {isCaptain, gameState} = props;

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

    return (
        <div>
            {renderAddPlayer()}
            <GameDetailRosterPlayerList {...props} />
        </div>
    );
};

export default GameDetailRoster;
