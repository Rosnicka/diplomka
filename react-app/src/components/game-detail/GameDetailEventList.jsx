import React from 'react';
import {Col, Row, Table} from 'react-bootstrap'
import GameDetailEventElement from "./GameDetailEventElement";
import {GAME_EVENT_TYPE_GOAL} from "../../constants/GameEventTypes";

const GameDetailEventList = (props) => {
    const {gameEvents, gameHeader} = props;

    const listAllEvents = () => {
        let homeScore = 0;
        let hostScore = 0;

        return (
            gameEvents.map((event, index) => {
                if (event.type === GAME_EVENT_TYPE_GOAL) {
                    if (gameHeader.home.id === event.team.id) {
                        homeScore = homeScore + 1;
                    } else if (gameHeader.host.id === event.team.id) {
                        hostScore = hostScore + 1;
                    }
                }

                return <GameDetailEventElement key={index} gameEvent={event} gameActualResult={homeScore + ':' + hostScore}/>
            })
        )
    }

    if (gameEvents.length === 0) {
        return '';
    }

    return (
        <Row>
            <h3>Události zápasu</h3>
            <Col xs={12} className="game-event">
                <Table>
                    <thead>
                    <tr>
                        <th>Minuta</th>
                        <th>Co se stalo?</th>
                        <th>Hráč</th>
                        <th>Stav zápasu</th>
                    </tr>
                    </thead>
                    <tbody>
                        {listAllEvents()}
                    </tbody>

                </Table>
            </Col>
        </Row>
    );
};

export default GameDetailEventList;
