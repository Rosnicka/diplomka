import {IS_FETCHING_USER, RECEIVE_LOGGED_USER} from "../../constants/UserActionTypes";
import {fetchGet, fetchPost} from "../../utils/FetchMethods";
import {LOGGED_USER_URL, LOGIN_USER_URL} from "../../constants/Routes";
import {getMyTeam, isFetchingTeam} from "../my-team/MyTeamActions";

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
            console.log(data);
            if (data.user !== false) {
                user = data.user;
                dispatch(receiveLoggedUser(user));
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}