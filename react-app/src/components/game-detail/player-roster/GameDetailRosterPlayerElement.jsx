import React from 'react';
import {Button} from 'react-bootstrap'
import {
    GAME_EVENT_TYPE_ASSIST, GAME_EVENT_TYPE_GOAL, GAME_EVENT_TYPE_RED_CARD,
    GAME_EVENT_TYPE_YELLOW_CARD
} from "../../../constants/GameEventTypes";
import {GAME_STATE_FILLING_ROSTER, GAME_STATE_PLAYING} from "../../../constants/GameStateTypes";

const GameDetailRosterPlayerElement = (props) => {
    const {player, onClickRemovePlayerFromRoaster, onClickAddNewEvent, isReferee, isCaptain, gameState} = props;
    const getGameEventButtons = () => {
        if (isReferee && gameState === GAME_STATE_PLAYING) {
            return (
                <div>
                    <Button bsStyle="success" bsSize="small"
                            onClick={() => onClickAddNewEvent(player, GAME_EVENT_TYPE_GOAL)}>Gól</Button>
                    <Button bsStyle="info" bsSize="small"
                            onClick={() => onClickAddNewEvent(player, GAME_EVENT_TYPE_ASSIST)}>Asistence</Button>
                    <Button bsStyle="warning" bsSize="small"
                            onClick={() => onClickAddNewEvent(player, GAME_EVENT_TYPE_YELLOW_CARD)}>Žl. karta</Button>
                    <Button bsStyle="danger" bsSize="small"
                            onClick={() => onClickAddNewEvent(player, GAME_EVENT_TYPE_RED_CARD)}>Č. karta</Button>
                </div>
            )
        } else {
            return '';
        }
    }

    const getRosterEditButtons = () => {
        if (isCaptain && gameState === GAME_STATE_FILLING_ROSTER) {
            return (
                <Button bsStyle="danger" bsSize="small" onClick={() => onClickRemovePlayerFromRoaster(player.id)}>
                    Odebrat ze soupisky
                </Button>
            )
        } else {
            return '';
        }
    }

    return (
        <tr>
            <td>{player.number}.</td>
            <td>{player.first_name} {player.last_name}</td>
            <td>
                {getGameEventButtons()}
                {getRosterEditButtons()}
            </td>
        </tr>
    );
};

export default GameDetailRosterPlayerElement;
