import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router'
import {Col} from 'react-bootstrap'

import PlayerForm from "../../forms/PlayerForm";
import PlayerList from "../../components/player/PlayerList";
import {LinkContainer} from 'react-router-bootstrap';
import {createPlayer, deletePlayer, updatePlayer} from "../../actions/my-team/MyTeamActions";
import AlertMessage from "../../components/utils/AlertMessage";

const mapStateToProps = (state) => {
    return {
        players: state.myTeam.myPlayers,
        playerMsg: state.myTeam.myPlayersMessageBox
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitNewPlayerForm: (player, values) => {
            dispatch(createPlayer(values));
        },

        onSubmitEditPlayerForm: (player, values) => {
            dispatch(updatePlayer(player.id, values));
        },

        onDeletePlayer: (id) => {
            dispatch(deletePlayer(id));
        }
    };
};

const PlayerRepository = (props) => {
    const {playerMsg, players, match, onSubmitNewPlayerForm, onSubmitEditPlayerForm, onDeletePlayer} = props;

    const findPlayer = (id) => {
        if (id === undefined) {
            return false;
        }

        const playerId = parseInt(id);
        return players.find((player) => {
            return player.id === playerId;
        })
    };

    const renderRegisterNewPlayerForm = () => {
        if (match.path === '/hraci/novy-hrac') {
            return (
                <div>
                    <LinkContainer to={'/hraci'}>
                        <button className="btn btn-info btn-sm pull-right">
                            Zpět na seznam hráčů
                        </button>
                    </LinkContainer>
                    <h2>Nový hráč</h2>
                    <PlayerForm onSubmitPlayerForm={onSubmitNewPlayerForm} player={false} />
                </div>
            )
        }
        return '';
    };

    const renderEditPlayerForm = () => {
        if (match.path !== '/hraci/:id') {
            return '';
        }

        const player = findPlayer(match.params.id);
        if (player === undefined || player === false) {
            return <Redirect to="/hraci"/>
        } else {
            return (
                <div>
                    <LinkContainer to={'/hraci'}>
                        <button className="btn btn-info btn-sm pull-right">
                            Zpět na seznam hráčů
                        </button>
                    </LinkContainer>
                    <h2>Editace hráče: {player.first_name} {player.last_name}</h2>
                    <PlayerForm onSubmitPlayerForm={onSubmitEditPlayerForm} player={player}/>
                </div>
            )
        }
    };

    const renderPlayersList = () => {
        if (match.path === '/hraci') {
            return (
                <div>
                    <LinkContainer to={'/hraci/novy-hrac'}>
                        <button className="btn btn-success btn-sm pull-right">
                            Registrovat nového hráče
                        </button>
                    </LinkContainer>
                    <h2>Seznam hráčů</h2>
                    <PlayerList players={players} onDeletePlayer={onDeletePlayer}/>
                </div>
            );
        }
        return '';
    };

    const renderMsgBox = () => {
        if (playerMsg === false) {
            return '';
        }

        return (
            <Col xs={12}>
                <AlertMessage type={playerMsg.type} text={playerMsg.text}/>
            </Col>
        )
    }

    return (
        <div>
            {renderRegisterNewPlayerForm()}
            {renderEditPlayerForm()}
            {renderPlayersList()}
            {renderMsgBox()}
        </div>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerRepository)
