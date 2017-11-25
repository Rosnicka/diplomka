import {combineReducers} from 'redux';
import users from './../reducers/users/UserIdentityReducer'
import myTeam from './../reducers/my-team/MyTeamReducer'
import data from './../reducers/data/DataReducer'

const dispatchingApp = combineReducers({
    users,
    myTeam,
    data
});

export default dispatchingApp;