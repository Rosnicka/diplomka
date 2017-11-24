import {combineReducers} from 'redux';
import users from './../reducers/users/UserIdentityReducer'
import myTeam from './../reducers/my-team/MyTeamReducer'

const dispatchingApp = combineReducers({
    users,
    myTeam
});

export default dispatchingApp;