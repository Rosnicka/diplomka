import {combineReducers} from 'redux'
import {IS_FETCHING_TEAM, RECEIVE_MY_TEAM} from "../../constants/MyTeamActionTypes";

const myTeam = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_MY_TEAM:
            return action.team;
        default:
            return state;
    }
};

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
    isFetchingTeam
});

export default myTeamReducer;