import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap'

import LoadingSpinner from "../../components/utils/LoadingSpinner";
import GameDetailEventList from "../../components/game-detail/GameDetailEventList";
import {
    addElapsedSecond, addPlayerToGame, changeGameState, removePlayerFromGame,
    setLastStartGameTime
} from "../../actions/game-detail/GameDetailActions";
import GameDetailControls from "../../components/game-detail/GameDetailControls";
import GameDetailHeader from "../../components/game-detail/GameDetailHeader";
import GameDetailPlayerRoster from "../../components/game-detail/player-roster/GameDetailRoster";
import {GAME_STATE_FINISHED, GAME_STATE_PAUSED, GAME_STATE_PLAYING} from "../../constants/GameStateTypes";

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
        gameLastStartTime: state.gameDetail.gameLastStartTime
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
            dispatch(setLastStartGameTime(gameId));
            dispatch(changeGameState(gameId, GAME_STATE_PLAYING));
        },
        onClickPauseGame: (gameId) => {
            dispatch(changeGameState(gameId, GAME_STATE_PAUSED));
        },
        onClickResumeGame: (gameId) => {
            dispatch(setLastStartGameTime(gameId));
            dispatch(changeGameState(gameId, GAME_STATE_PLAYING));
        },
        onClickEndGame: (gameId) => {
            dispatch(changeGameState(gameId, GAME_STATE_FINISHED));
        },
        onGameIntervalTick: () => {
            dispatch(addElapsedSecond());
        }
    };
};

const GameDetailRepository = (props) => {
    const {gameHeader, homePlayers, hostPlayers, gameEvents, myTeam, gameLastStartTime, gameState, gameElapsedSeconds} = props;

    const homeTeamName = () => (gameHeader !== false ? gameHeader.home.name : '')
    const hostTeamName = () => (gameHeader !== false ? gameHeader.host.name : '')

    const isLoaded = () => {
        return !(
            gameHeader === false ||
            homePlayers === false ||
            hostPlayers === false ||
            gameElapsedSeconds === false ||
            gameState === false ||
            gameLastStartTime === false ||
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

    if (!isLoaded()) {
        return (
            <div>
                <LoadingSpinner text="Načítám detail zápasu"/>
            </div>
        )
    }

    return (
        <div>
            <GameDetailControls {...props} />
            <Col xs={12} className="game-detail">
                <GameDetailHeader homeTeamName={homeTeamName()} hostTeamName={hostTeamName()} {...props}/>
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
                <GameDetailEventList events={gameEvents}/>
            </Col>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameDetailRepository)