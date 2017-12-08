import {combineReducers} from 'redux'
import {
    GD_RECEIVE_HOME_PLAYERS, GD_RECEIVE_HOST_PLAYERS, GD_RECEIVE_GAME_HEADER, GD_RESET_GAME_HEADER,
    GD_RESET_HOME_PLAYERS, GD_RESET_HOST_PLAYERS, GD_RECEIVE_EVENTS, GD_RESET_EVENTS
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

const gameDetailReducer = combineReducers({
    gameHeader,
    homePlayers,
    hostPlayers,
    gameEvents
});

export default gameDetailReducer;