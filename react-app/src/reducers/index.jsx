import {combineReducers} from 'redux';
import userIdentity from './../reducers/users/UserIdentityReducer'

const dispatchingApp = combineReducers({
    userIdentity
});

export default dispatchingApp;