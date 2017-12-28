import {combineReducers} from 'redux'
import {RECEIVE_GROUP_RESULTS} from "../../constants/GroupActionTypes";

const results = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_GROUP_RESULTS:
            return action.results;
        default:
            return state;
    }
};

const groupReducer = combineReducers({
    results
});

export default groupReducer;