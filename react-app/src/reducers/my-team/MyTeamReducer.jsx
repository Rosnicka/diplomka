import {combineReducers} from 'redux'
import {
    IS_FETCHING_TEAM, RECEIVE_MY_TEAM, RECEIVE_MY_PLAYERS, RECEIVE_MY_TEAM_APPLICATION, RECEIVE_NEW_PLAYER,
    RECEIVE_UPDATED_PLAYER, REMOVE_PLAYER, RECEIVE_MY_GAMES_TO_PLAY, RECEIVE_MY_GAMES_AS_REFEREE
} from "../../constants/MyTeamActionTypes";

const myTeam = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_MY_TEAM:
            return action.team;
        default:
            return state;
    }
};

const myGamesAsReferee = (state = false, action) => {
    switch (action.type) {
        case RECEIVE_MY_GAMES_AS_REFEREE:
            return action.games;
        default:
            return state;
    }
}

const myGamesToPlay = (state = false, action) => {
    switch (action.type) {
        case RECEIVE_MY_GAMES_TO_PLAY:
            return action.games;
        default:
            return state;
    }
}

const myPlayers = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_MY_PLAYERS:
            return action.players;
        case RECEIVE_NEW_PLAYER:
            return [...state, action.player]
        case RECEIVE_UPDATED_PLAYER:
            return [...state.filter((player) => {return player.id !== action.player.id}), action.player]
        case REMOVE_PLAYER:
            return [...state.filter((player) => {return player.id !== action.id})]
        default:
            return state;
    }
}

const myTeamApplication = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_MY_TEAM_APPLICATION:
            return action.application;
        default:
            return state;
    }
}

const isFetchingTeam = (state = false, action) => {
    switch (action.type) {
        case IS_FETCHING_TEAM:
            return action.isFetching;
        default:
            return state;
    }
}

const myTeamReducer = combineReducers({
    myTeam,
    myPlayers,
    isFetchingTeam,
    myTeamApplication,
    myGamesToPlay,
    myGamesAsReferee
});

export default myTeamReducer;