import {combineReducers} from 'redux'
import {
    IS_FETCHING_USER, RECEIVE_LOGGED_USER, RECEIVE_USER_LOGIN_MSG,
    RESET_USER_LOGIN_MSG
} from "../../constants/UserActionTypes";

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

const messageBox = (state = false, action) => {
    switch (action.type) {
        case RESET_USER_LOGIN_MSG:
            return false;
        case RECEIVE_USER_LOGIN_MSG:
            return action.msg;
        default:
            return state;
    }
}

const usersReducer = combineReducers({
    userIdentity,
    isFetchingUser,
    messageBox
})

export default usersReducer;