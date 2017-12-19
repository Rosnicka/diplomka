import {
    getGameByIdUrl, getGameEventsByGameId, getGamePlayersByGameIdUrl, getGameTeamPlayers, getRemovePlayerFromGameUrl,
    getTeamPlayersByTeamIdUrl
} from "../../constants/Routes";
import {
    GD_ADD_HOME_PLAYER,
    GD_ADD_HOST_PLAYER, GD_ELAPSED_SECONDS_RECEIVE, GD_ELAPSED_SECONDS_RESET, GD_ELAPSED_SECONDS_TICK,
    GD_RECEIVE_EVENTS,
    GD_RECEIVE_GAME_HEADER, GD_RECEIVE_GAME_STATE, GD_RECEIVE_HOME_PLAYERS,
    GD_RECEIVE_HOST_PLAYERS, GD_REMOVE_HOME_PLAYER, GD_REMOVE_HOST_PLAYER, GD_RESET_EVENTS, GD_RESET_GAME_HEADER,
    GD_RESET_GAME_STATE
} from "../../constants/GameDetailActionTypes";
import {fetchDelete, fetchGet, fetchPost} from "../../utils/FetchMethods";
import {store} from "../../containers/DispatchingApp";

const receiveGameHeader = game => {
    return {
        type: GD_RECEIVE_GAME_HEADER,
        game: game
    }
}

const receiveHomePlayers = players => {
    return {
        type: GD_RECEIVE_HOME_PLAYERS,
        players: players
    }
}

const addHomePlayer = player => {
    return {
        type: GD_ADD_HOME_PLAYER,
        player: player
    }
}

const removeHomePlayer = playerId => {
    return {
        type: GD_REMOVE_HOME_PLAYER,
        playerId: playerId
    }
}

const receiveHostPlayers = players => {
    return {
        type: GD_RECEIVE_HOST_PLAYERS,
        players: players
    }
}

const addHostPlayer = player => {
    return {
        type: GD_ADD_HOST_PLAYER,
        player: player
    }
}

const removeHostPlayer = playerId => {
    return {
        type: GD_REMOVE_HOST_PLAYER,
        playerId: playerId
    }
}

const resetGameHeader = () => {
    return {
        type: GD_RESET_GAME_HEADER,
        game: false
    }
}

const resetGameDetailHomePlayers = () => {
    return {
        type: GD_RECEIVE_HOME_PLAYERS,
        players: false
    }
}

const receiveGameEvents = (events) => {
    return {
        type: GD_RECEIVE_EVENTS,
        events: events
    }
}

const resetGameEvents = () => {
    return {
        type: GD_RESET_EVENTS,
        events: []
    }
}

const resetGameDetailHostPlayers = () => {
    return {
        type: GD_RECEIVE_HOST_PLAYERS,
        players: false
    }
}

const resetElapsedSeconds = () => {
    return {
        type: GD_ELAPSED_SECONDS_RESET
    }
}

export const addElapsedSecond = () => {
    return {
        type: GD_ELAPSED_SECONDS_TICK
    }
}

const receiveElapsedSeconds = (elapsedSeconds) => {
    return {
        type: GD_ELAPSED_SECONDS_RECEIVE,
        seconds: elapsedSeconds
    }
}

const receiveGameState = (state) => {
    return {
        type: GD_RECEIVE_GAME_STATE,
        state: state
    }
}

const resetGameState = () => {
    return {
        type: GD_RESET_GAME_STATE
    }
}


export const resetGameDetail = () => dispatch => {
    dispatch(resetGameHeader());
    dispatch(resetGameDetailHomePlayers());
    dispatch(resetGameDetailHostPlayers());
    dispatch(resetGameEvents());
    dispatch(resetElapsedSeconds());
    dispatch(resetGameState());
}

export const loadGameDetailEvents = (gameId) => dispatch => {
    fetchGet(getGameEventsByGameId(gameId)).then((response) => {
        response.json().then((data) => {
            let events = [];
            if (data.data !== false) {
                events = data.data;
            }
            dispatch(receiveGameEvents(events));

        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const loadGameDetail = (gameId) => dispatch => {
    fetchGet(getGameByIdUrl(gameId)).then((response) => {
        response.json().then((data) => {
            let game = {};
            if (data.data !== false) {
                game = data.data;
            }

            dispatch(receiveGameHeader(game));
            dispatch(receiveGameState(game.state));
            dispatch(receiveElapsedSeconds(game.elapsed_seconds));
            dispatch(loadGameDetailHomePlayers(game.id, game.home.id));
            dispatch(loadGameDetailHostPlayers(game.id, game.host.id));

        });
    }).catch(function (error) {
        console.log(error);
    });
}

const loadGameDetailHomePlayers = (gameId, teamId) => dispatch => {
    fetchGet(getGameTeamPlayers(gameId, teamId)).then((response) => {
        response.json().then((data) => {
            let players = [];
            if (data.data !== false) {
                players = data.data;
            }
            dispatch(receiveHomePlayers(players))
        });
    }).catch(function (error) {
        console.log(error);
    });
}

const loadGameDetailHostPlayers = (gameId, teamId) => dispatch => {
    fetchGet(getGameTeamPlayers(gameId, teamId)).then((response) => {
        response.json().then((data) => {
            let players = [];
            if (data.data !== false) {
                players = data.data;
            }
            dispatch(receiveHostPlayers(players))
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const addPlayerToGame = (playerId) => dispatch => {
    const state = store.getState();
    const data = {
        player: playerId,
        team: state.myTeam.myTeam.id,
    }

    fetchPost(getGamePlayersByGameIdUrl(state.gameDetail.gameHeader.id), data).then((response) => {
        response.json().then((data) => {
            if (data.data !== false) {
                const player = data.data;
                if (state.gameDetail.gameHeader.home.id === state.myTeam.myTeam.id) {
                    dispatch(addHomePlayer(player));
                } else {
                    dispatch(addHostPlayer(player));
                }
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const removePlayerFromGame = (playerId) => dispatch => {
    const state = store.getState();

    fetchDelete(getRemovePlayerFromGameUrl(state.gameDetail.gameHeader.id, playerId)).then((response) => {
        response.json().then((data) => {
            if (data.data === true) {
                if (state.gameDetail.gameHeader.home.id === state.myTeam.myTeam.id) {
                    dispatch(removeHomePlayer(playerId));
                } else {
                    dispatch(removeHostPlayer(playerId));
                }
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}
