import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap'

import LoadingSpinner from "../../components/utils/LoadingSpinner";
import GameDetailEventList from "../../components/game-detail/GameDetailEventList";
import {addElapsedSecond, addPlayerToGame, removePlayerFromGame} from "../../actions/game-detail/GameDetailActions";
import GameDetailControls from "../../components/game-detail/GameDetailControls";
import GameDetailHeader from "../../components/game-detail/GameDetailHeader";
import GameDetailPlayerRoster from "../../components/game-detail/player-roster/GameDetailRoster";

const mapStateToProps = (state) => {
    return {
        gameHeader: state.gameDetail.gameHeader,
        homePlayers: state.gameDetail.homePlayers,
        hostPlayers: state.gameDetail.hostPlayers,
        myPlayers: state.myTeam.myPlayers,
        gameEvents: state.gameDetail.gameEvents,
        myTeam: state.myTeam.myTeam,
        gameElapsedSeconds: state.gameDetail.gameElapsedSeconds,
        gameState: state.gameDetail.gameState,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectAddPlayer: (playerId) => {
            dispatch(addPlayerToGame(playerId))
        },
        onClickRemovePlayerFromRoaster: (playerId) => {
            dispatch(removePlayerFromGame(playerId))
        },
        onClickAddNewEvent: (player, eventType) => {
            console.log(player);
            console.log(eventType)
        },
        onClickStartGame: (gameId) => {
            console.log('zahajit zapas');
        },
        onClickPauseGame: (gameId) => {
            console.log('pausa zapas');
        },
        onClickResumeGame: (gameId) => {
            console.log('znovu spustit zapas');
        },
        onClickEndGame: (gameId) => {
            console.log('ukoncit zapas');
        },
        onGameIntervalTick: () => {
            dispatch(addElapsedSecond());
        }
    };
};

const GameDetailRepository = (props) => {
    const {gameHeader, homePlayers, hostPlayers, gameEvents, myTeam} = props;

    const homeTeamName = () => (gameHeader !== false ? gameHeader.home.name : '')
    const hostTeamName = () => (gameHeader !== false ? gameHeader.host.name : '')

    const isLoaded = () => {
        return !(
            gameHeader === false ||
            homePlayers === false ||
            hostPlayers === false ||
            myTeam.id === undefined
        )
    }

    const isHomeTeamCaptain = () => {
        return (gameHeader.home.id === myTeam.id)
    }

    const isHostTeamCaptain = () => {
        return (gameHeader.host.id === myTeam.id)
    }

    const isReferee = () => {
        return (gameHeader.referee.id === myTeam.id)
    }

    const renderPlayerRoster = () => {
        if (!isLoaded()) {
            return (
                <LoadingSpinner text="Načítám soupisky hráčů"/>
            )
        } else {
            return (
                <Row>
                    <Col xs={6} className="game-detail__team-roster">
                        <GameDetailPlayerRoster isCaptain={isHomeTeamCaptain()}
                                                isReferee={isReferee()}
                                                playersOnRoster={homePlayers} {...props} />
                    </Col>
                    <Col xs={6} className="game-detail__team-roster">
                        <GameDetailPlayerRoster isCaptain={isHostTeamCaptain()}
                                                isReferee={isReferee()}
                                                playersOnRoster={hostPlayers} {...props} />
                    </Col>
                </Row>
            )
        }
    }

    return (
        <div>
            <GameDetailControls {...props} />
            <Col xs={12} className="game-detail">
                <GameDetailHeader homeTeamName={homeTeamName()} hostTeamName={hostTeamName()} {...props}/>
                {renderPlayerRoster()}
                <GameDetailEventList events={gameEvents}/>
            </Col>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameDetailRepository)