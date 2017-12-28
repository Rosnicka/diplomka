import {IS_FETCHING_USER, RECEIVE_LOGGED_USER} from "../../constants/UserActionTypes";
import {fetchGet, fetchPost} from "../../utils/FetchMethods";
import {LOGGED_USER_URL, LOGIN_USER_URL, REGISTER_USER_URL} from "../../constants/Routes";
import {getMyGamesAsReferee, getMyGamesToPlay, getMyPlayers, getMyTeam, isFetchingTeam} from "../my-team/MyTeamActions";
import {loadGroupResults} from "../group/GroupActions";

const receiveLoggedUser = user => {
    return {
        type: RECEIVE_LOGGED_USER,
        user: user
    }
}

const isFetchingUser = (isFetching) => {
    return {
        type: IS_FETCHING_USER,
        isFetching: isFetching,
    }
}

export const getLoggedUser = () => dispatch => {
    fetchGet(LOGGED_USER_URL).then((response) => {
        response.json().then((data) => {
            let user = {};
            if (data.user !== false) {
                user = data.user;
                if (user.team !== undefined && user.team !== null) {
                    dispatch(isFetchingTeam(true));
                    dispatch(getMyTeam(user.team));
                    dispatch(getMyPlayers(user.team));

                    dispatch(getMyGamesToPlay(user.team));
                    dispatch(getMyGamesAsReferee(user.team));
                }
            }
            dispatch(receiveLoggedUser(user));
            dispatch(isFetchingUser(false));

        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const loginUser = (username, password) => dispatch => {
    fetchPost(LOGIN_USER_URL, {username, password}).then((response) => {
        response.json().then((data) => {
            let user = {};
            if (data.user !== false) {
                user = data.user;
                dispatch(receiveLoggedUser(user));
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const registerUser = (values) => dispatch => {
    fetchPost(REGISTER_USER_URL, values).then((response) => {
        response.json().then((data) => {
            console.log(data);
        });
    }).catch(function (error) {
        console.log(error);
    });
}