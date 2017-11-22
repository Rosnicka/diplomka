import {RECEIVE_LOGGED_USER} from "../../constants/UserActionTypes";

const userIdentityReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LOGGED_USER:
            return action.user;
        default:
            return state;
    }
};

export default userIdentityReducer;