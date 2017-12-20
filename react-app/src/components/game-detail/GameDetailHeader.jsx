import React from 'react';
import {Row, Col} from 'react-bootstrap'
import Stopwatch from "../stopwatch/Stopwatch";
import {GAME_EVENT_TYPE_GOAL} from "../../constants/GameEventTypes";

const GameDetailHeader = (props) => {
    const {gameHeader, gameEvents} = props;

    const getTeamScore = (teamId) => {
        let score = 0;
        gameEvents.map((gameEvent) => {
           if (gameEvent.type === GAME_EVENT_TYPE_GOAL && gameEvent.team.id === teamId) {
               score = score + 1;
           }
        });
        return score;
    }

    return (
        <Row>
            <Col xs={12} className="game-detail__header">
                <Stopwatch {...props} />
                <Row className="score-board">
                    <Col xs={4} className="score-board__team score-board__team--home">
                        <div className="score-board__team-name">{gameHeader.home.name}</div>
                        <div className="score-board__local">Domácí</div>
                    </Col>
                    <Col xs={4} className="score-board__results">
                        {getTeamScore(gameHeader.home.id)}:{getTeamScore(gameHeader.host.id)}
                    </Col>
                    <Col xs={4} className="score-board__team score-board__team--visitors">
                        <div className="score-board__team-name">{gameHeader.host.name}</div>
                        <div className="score-board__local">Hosté</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default GameDetailHeader;
