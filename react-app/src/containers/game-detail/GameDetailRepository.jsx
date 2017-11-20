import React, {Component} from 'react';
import {Col, Row, Button} from 'react-bootstrap'
import GameDetailPlayerElement from "../../components/game-detail/GameDetailPlayerElement";

class GameDetailRepository extends Component {
    render() {
        const {homeTeam, visitorsTeam, homePlayers, visitorsPlayers} = this.props;

        return (
            <Col xs={10} xsOffset={1} className="game-detail show-grid">
                <Row>
                    <Col xs={12} className="game-detail__header">
                        <Row className="game-stage">
                            čeká na spuštění / 1. poločas / 2. poločas / dohráno
                        </Row>
                        <Row className="timer">
                            (10:00)
                        </Row>
                        <Row className="score-board">
                            <Col xs={4} className="score-board__team score-board__team--home">
                                <div className="score-board__team-name">SK Slavia</div>
                                <div className="score-board__local">Domácí</div>
                            </Col>
                            <Col xs={4} className="score-board__results">
                                5:2
                            </Col>
                            <Col xs={4} className="score-board__team score-board__team--visitors">
                                <div className="score-board__team-name">AC Sparta</div>
                                <div className="score-board__local">Hosté</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} className="game-detail__team-roster">
                        {homePlayers.map(player => {
                            return (
                                <GameDetailPlayerElement key={player.id} player={player} />
                            )
                        })}
                    </Col>
                    <Col xs={6} className="game-detail__team-roster">
                        {visitorsPlayers.map(player => {
                            return (
                                <GameDetailPlayerElement key={player.id} player={player} />
                            )
                        })}
                    </Col>
                </Row>
                <Row>
                    <h3>Události zápasu</h3>
                    <Row>
                        <div className="game-event">
                            <Col xs={2}>5.</Col>
                            <Col xs={10}>Gól domácího týmu 1:0</Col>
                        </div>
                    </Row>
                </Row>
            </Col>
        );
    }
}

export default GameDetailRepository;
