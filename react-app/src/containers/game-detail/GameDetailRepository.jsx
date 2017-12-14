import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap'
import GameDetailPlayerElement from "../../components/game-detail/GameDetailPlayerElement";

import LoadingSpinner from "../../components/utils/LoadingSpinner";
import GameDetailEventList from "../../components/game-detail/GameDetailEventList";
import GameDetailPrepareRoster from "../../components/game-detail/GameDetailPrepareRoster";
import {addPlayerToGame, removePlayerFromGame} from "../../actions/game-detail/GameDetailActions";

const mapStateToProps = (state) => {
    return {
        gameHeader: state.gameDetail.gameHeader,
        homePlayers: state.gameDetail.homePlayers,
        hostPlayers: state.gameDetail.hostPlayers,
        myPlayers: state.myTeam.myPlayers,
        gameEvents: state.gameDetail.gameEvents,
        myTeam: state.myTeam.myTeam,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectAddPlayer: (playerId) => {
            dispatch(addPlayerToGame(playerId))
        },
        onClickRemovePlayerFromRoaster: (playerId) => {
            dispatch(removePlayerFromGame(playerId))
        }
    };
};

const GameDetailRepository = (props) => {
    const {gameHeader, homePlayers, hostPlayers, gameEvents, myPlayers, myTeam, onSelectAddPlayer, onClickRemovePlayerFromRoaster} = props;

    const loadPlayers = (players, loadingText) => {
        if (players === false) {
            return <LoadingSpinner text={loadingText}/>
        }

        {
            players.map(player => {
                return (
                    <GameDetailPlayerElement key={player.id} player={player}/>
                )
            })
        }
    }

    const homeTeamName = () => (gameHeader !== false ? gameHeader.home.name : '')
    const hostTeamName = () => (gameHeader !== false ? gameHeader.host.name : '')

    const homeTeamRoster = () => {
        if (gameHeader.home === undefined || myTeam.id === undefined || homePlayers === false || myPlayers === false) {
            return <LoadingSpinner text="Načítám soupisky"/>
        } else if (myPlayers !== false && gameHeader.home.id === myTeam.id) {
            return <GameDetailPrepareRoster myPlayers={myPlayers} playersOnRoster={homePlayers}
                                            onSelectAddPlayer={onSelectAddPlayer}
                                            onClickRemovePlayerFromRoaster={onClickRemovePlayerFromRoaster}/>
        }
        return 'Nejste kapitan domacího týmu';
    }

    const hostTeamRoster = () => {
        if (gameHeader.home === undefined || myTeam.id === undefined || hostPlayers === false || myPlayers === false) {
            return <LoadingSpinner text="Načítám soupisky"/>
        } else if (myPlayers !== false && myTeam.id !== undefined && gameHeader.host.id === myTeam.id) {
            return <GameDetailPrepareRoster myPlayers={myPlayers} playersOnRoster={hostPlayers}
                                            onSelectAddPlayer={onSelectAddPlayer}
                                            onClickRemovePlayerFromRoaster={onClickRemovePlayerFromRoaster}/>
        }
        return 'Nejste kapitan hostujiciho týmu';
    }

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
                                <div className="score-board__team-name">{homeTeamName()}</div>
                                <div className="score-board__local">Domácí</div>
                            </Col>
                            <Col xs={4} className="score-board__results">
                                2:1
                            </Col>
                            <Col xs={4} className="score-board__team score-board__team--visitors">
                                <div className="score-board__team-name">{hostTeamName()}</div>
                                <div className="score-board__local">Hosté</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        {homeTeamRoster()}
                    </Col>
                    <Col xs={6}>
                        {hostTeamRoster()}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} className="game-detail__team-roster">
                        {loadPlayers(homePlayers, 'Načítám hráče domácích')}
                    </Col>
                    <Col xs={6} className="game-detail__team-roster">
                        {loadPlayers(hostPlayers, 'Načítám hráče hostů')}
                    </Col>
                </Row>
                <GameDetailEventList events={gameEvents}/>
            </Col>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameDetailRepository)