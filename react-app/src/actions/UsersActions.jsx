import {RECEIVE_LOGGED_USER} from "../constants/UserActionTypes";
import {fetchGet, fetchPost} from "../utils/FetchMethods";
import {LOGGED_USER_URL, LOGIN_USER_URL} from "../constants/Routes";

const receiveLoggedUser = user => {
    return {
        type: RECEIVE_LOGGED_USER,
        user: user
    }
}

export const getLoggedUser = () => dispatch => {
    fetchGet(LOGGED_USER_URL).then((response) => {
        response.json().then((data) => {
            let user = {};
            if (data.user !== false) {
                user = data.user;
            }
            dispatch(receiveLoggedUser(user))
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