import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap'
import GameDetailPlayerElement from "../../components/game-detail/GameDetailPlayerElement";

import LoadingSpinner from "../../components/utils/LoadingSpinner";
import GameDetailEventList from "../../components/game-detail/GameDetailEventList";
import GameDetailPrepareRoster from "../../components/game-detail/GameDetailPrepareRoster";
import {addPlayerToGame, removePlayerFromGame} from "../../actions/game-detail/GameDetailActions";
import GameDetailControls from "../../components/game-detail/GameDetailControls";
import GameDetailHeader from "../../components/game-detail/GameDetailHeader";
import GameDetailRoasterPlayerList from "../../components/game-detail/player-roster/GameDetailRosterPlayerList";
import GameDetailPlayerRoster from "../../components/game-detail/player-roster/GameDetailRoster";

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
                                                playersOnRoster={homePlayers} {...props} />
                    </Col>
                    <Col xs={6} className="game-detail__team-roster">
                        <GameDetailPlayerRoster isCaptain={isHostTeamCaptain()}
                                                playersOnRoster={hostPlayers} {...props} />
                    </Col>
                </Row>
            )
        }
    }

    return (
        <div>
            <GameDetailControls/>
            <Col xs={12} className="game-detail">
                <GameDetailHeader homeTeamName={homeTeamName()} hostTeamName={hostTeamName()}/>
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