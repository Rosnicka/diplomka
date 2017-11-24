import {combineReducers} from 'redux'
import {IS_FETCHING_USER, RECEIVE_LOGGED_USER} from "../../constants/UserActionTypes";

const userIdentity = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LOGGED_USER:
            return action.user;
        default:
            return state;
    }
};

const isFetchingUser = (state = true, action) => {
    switch (action.type) {
        case IS_FETCHING_USER:
            return action.isFetching;
        default:
            return state;
    }
}

const usersReducer = combineReducers({
    userIdentity,
    isFetchingUser
})

export default usersReducer;