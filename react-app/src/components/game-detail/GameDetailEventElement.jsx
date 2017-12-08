import React from 'react';
import {
    GAME_EVENT_TYPE_ASSIST, GAME_EVENT_TYPE_GOAL, GAME_EVENT_TYPE_RED_CARD,
    GAME_EVENT_TYPE_YELLOW_CARD
} from "../../constants/GameEventTypes";

const GameDetailEventElement = (props) => {
    const {gameEvent, gameActualResult} = props;

    const eventType = gameEventTypes.find((gameEventType) => {
        return gameEventType.code == gameEvent.type
    });

    return (
        <tr>
            <td>{gameEvent.minute}.</td>
            <td>
                <span className={eventType.className}>{eventType.text}</span>
            </td>
            <td>{gameEvent.player} ({gameEvent.team})</td>
            <td>{gameActualResult}</td>
        </tr>
    );
};

const gameEventTypes = [
    {code: GAME_EVENT_TYPE_ASSIST, className: 'label label-info', text: 'Asistence'},
    {code: GAME_EVENT_TYPE_GOAL, className: 'label label-success', text: 'Gól'},
    {code: GAME_EVENT_TYPE_YELLOW_CARD, className: 'label label-warning', text: 'Žl. karta'},
    {code: GAME_EVENT_TYPE_RED_CARD, className: 'label label-danger', text: 'Č. karta'},
]

export default GameDetailEventElement;
