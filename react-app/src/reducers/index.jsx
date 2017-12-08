import {combineReducers} from 'redux';
import users from './../reducers/users/UserIdentityReducer'
import myTeam from './../reducers/my-team/MyTeamReducer'
import data from './../reducers/data/DataReducer'
import gameDetail from './../reducers/game-detail/GameDetailReducer'

const dispatchingApp = combineReducers({
    users,
    myTeam,
    data,
    gameDetail
});

export default dispatchingApp;