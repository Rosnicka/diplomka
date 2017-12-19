import {combineReducers} from 'redux'
import {
    GD_RECEIVE_HOME_PLAYERS, GD_RECEIVE_HOST_PLAYERS, GD_RECEIVE_GAME_HEADER, GD_RESET_GAME_HEADER,
    GD_RESET_HOME_PLAYERS, GD_RESET_HOST_PLAYERS, GD_RECEIVE_EVENTS, GD_RESET_EVENTS, GD_ADD_HOME_PLAYER,
    GD_REMOVE_HOST_PLAYER, GD_REMOVE_HOME_PLAYER, GD_ADD_HOST_PLAYER, GD_ELAPSED_SECONDS_TICK,
    GD_ELAPSED_SECONDS_RECEIVE, GD_RECEIVE_GAME_STATE, GD_RESET_GAME_STATE, GD_ELAPSED_SECONDS_RESET
} from "../../constants/GameDetailActionTypes";

const gameHeader = (state = false, action) => {
    switch (action.type) {
        case GD_RECEIVE_GAME_HEADER:
            return action.game;
        case GD_RESET_GAME_HEADER:
            return false;
        default:
            return state;
    }
};

const homePlayers = (state = false, action) => {
    switch (action.type) {
        case GD_RECEIVE_HOME_PLAYERS:
            return action.players;
        case GD_RESET_HOME_PLAYERS:
            return false;
        case GD_ADD_HOME_PLAYER:
            return [...state, action.player]
        case GD_REMOVE_HOME_PLAYER:
            return [...state.filter((player) => {
                return player.id !== action.playerId
            })]
        default:
            return state;
    }
};

const hostPlayers = (state = false, action) => {
    switch (action.type) {
        case GD_RECEIVE_HOST_PLAYERS:
            return action.players;
        case GD_RESET_HOST_PLAYERS:
            return false;
        case GD_ADD_HOST_PLAYER:
            return [...state, action.player]
        case GD_REMOVE_HOST_PLAYER:
            return [...state.filter((player) => {
                return player.id !== action.playerId
            })]
        default:
            return state;
    }
};

const gameEvents = (state = [], action) => {
    switch (action.type) {
        case GD_RECEIVE_EVENTS:
            return action.events
        case GD_RESET_EVENTS:
            return [];
        default:
            return state;
    }
};

const gameState = (state = false, action) => {
    switch (action.type) {
        case GD_RESET_GAME_STATE:
            return false;
        case GD_RECEIVE_GAME_STATE:
            return action.state
        default:
            return state;
    }
}

const gameElapsedSeconds = (state = false, action) => {
    switch (action.type) {
        case GD_ELAPSED_SECONDS_RESET:
            return false;
        case GD_ELAPSED_SECONDS_RECEIVE:
            return action.seconds;
        case GD_ELAPSED_SECONDS_TICK:
            return state + 1;
        default:
            return state
    }
}

const gameDetailReducer = combineReducers({
    gameHeader,
    homePlayers,
    hostPlayers,
    gameEvents,
    gameState,
    gameElapsedSeconds
});

export default gameDetailReducer;