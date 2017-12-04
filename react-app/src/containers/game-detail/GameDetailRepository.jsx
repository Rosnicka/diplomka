import React, {Component} from 'react';
import {Col, Row, Table} from 'react-bootstrap'
import GameDetailPlayerElement from "../../components/game-detail/GameDetailPlayerElement";

class GameDetailRepository extends Component {
    render() {
        const {homeTeam, visitorsTeam, homePlayers, visitorsPlayers} = this.props;

        return (
            <div>
                <Col xs={6} xsOffset={3} className="text-center">
                    <button className="btn btn-info">Pozastavit zápas</button>
                    <button className="btn btn-danger">Ukončit zápas</button>
                </Col>
                <Col xs={12} className="game-detail">
                    <Row>
                        <Col xs={12} className="game-detail__header">
                            <Row className="game-stage">
                                1. poločas
                            </Row>
                            <Row className="timer">
                                (21:33)
                            </Row>
                            <Row className="score-board">
                                <Col xs={4} className="score-board__team score-board__team--home">
                                    <div className="score-board__team-name">SK Slavia</div>
                                    <div className="score-board__local">Domácí</div>
                                </Col>
                                <Col xs={4} className="score-board__results">
                                    2:1
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
                                    <GameDetailPlayerElement key={player.id} player={player}/>
                                )
                            })}
                        </Col>
                        <Col xs={6} className="game-detail__team-roster">
                            {visitorsPlayers.map(player => {
                                return (
                                    <GameDetailPlayerElement key={player.id} player={player}/>
                                )
                            })}
                        </Col>
                    </Row>
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
                                <tr>
                                    <td>20.</td>
                                    <td><span className="label label-success">Gól</span></td>
                                    <td>Lukáš Kloubek (AC Sparta)</td>
                                    <td>2:1</td>
                                </tr>
                                <tr>
                                    <td>20.</td>
                                    <td><span className="label label-info">Asistence</span></td>
                                    <td>Lukáš Matoušek (AC Sparta)</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>16.</td>
                                    <td><span className="label label-success">Gól</span></td>
                                    <td>Vojtěch Lysý (SK Slavia)</td>
                                    <td>2:0</td>
                                </tr>
                                <tr>
                                    <td>16.</td>
                                    <td><span className="label label-info">Asistence</span></td>
                                    <td>Tomáš Křížek (SK Slavia)</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>7.</td>
                                    <td><span className="label label-warning">Žl. karta</span></td>
                                    <td>Lukáš Matoušek (AC Sparta)</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td><span className="label label-success">Gól</span></td>
                                    <td>Tomáš Křížek (SK Slavia)</td>
                                    <td>1:0</td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td><span className="label label-info">Asistence</span></td>
                                    <td>Vojtěch Lysý (SK Slavia)</td>
                                    <td>-</td>
                                </tr>
                                </tbody>

                            </Table>
                        </Col>
                    </Row>
                </Col>
            </div>
        );
    }
}

export default GameDetailRepository;
