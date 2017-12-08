import {getGameByIdUrl, getGameEventsByGameId, getTeamPlayersByTeamIdUrl} from "../../constants/Routes";
import {
    GD_RECEIVE_EVENTS,
    GD_RECEIVE_GAME_HEADER, GD_RECEIVE_HOME_PLAYERS,
    GD_RECEIVE_HOST_PLAYERS, GD_RESET_EVENTS, GD_RESET_GAME_HEADER
} from "../../constants/GameDetailActionTypes";
import {fetchGet} from "../../utils/FetchMethods";

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

const receiveHostPlayers = players => {
    return {
        type: GD_RECEIVE_HOST_PLAYERS,
        players: players
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

export const resetGameDetail = () => dispatch => {
    dispatch(resetGameHeader());
    dispatch(resetGameDetailHomePlayers());
    dispatch(resetGameDetailHostPlayers());
    dispatch(resetGameEvents());
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
            dispatch(loadGameDetailHomePlayers(game.home.id));
            dispatch(loadGameDetailHostPlayers(game.host.id));

        });
    }).catch(function (error) {
        console.log(error);
    });
}

const loadGameDetailHomePlayers = (teamId) => dispatch => {
    fetchGet(getTeamPlayersByTeamIdUrl(teamId)).then((response) => {
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

const loadGameDetailHostPlayers = (teamId) => dispatch => {
    fetchGet(getTeamPlayersByTeamIdUrl(teamId)).then((response) => {
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