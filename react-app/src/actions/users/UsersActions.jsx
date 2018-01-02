import {
    IS_FETCHING_USER, RECEIVE_LOGGED_USER, RECEIVE_USER_LOGIN_MSG, RECEIVE_USER_REGISTER_MSG,
    RESET_USER_LOGIN_MSG, RESET_USER_REGISTER_MSG
} from "../../constants/UserActionTypes";
import {fetchGet, fetchPost} from "../../utils/FetchMethods";
import {LOGGED_USER_URL, LOGIN_USER_URL, REGISTER_USER_URL} from "../../constants/Routes";
import {getMyGamesAsReferee, getMyGamesToPlay, getMyPlayers, getMyTeam, isFetchingTeam} from "../my-team/MyTeamActions";
import {loadGroupResults} from "../group/GroupActions";
import {ALERT_TYPE_DANGER, ALERT_TYPE_SUCCESS} from "../../components/utils/AlertMessage";

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

const receiveLoginUserMsg = (type, text) => {
    return {
        type: RECEIVE_USER_LOGIN_MSG,
        msg: {
            type: type,
            text: text
        }
    }
}

const resetLoginUserMsg = () => {
    return {
        type: RESET_USER_LOGIN_MSG
    }
}

const receiveRegisterUserMsg = (type, text) => {
    return {
        type: RECEIVE_USER_REGISTER_MSG,
        msg: {
            type: type,
            text: text
        }
    }
}

const resetRegisterUserMsg = () => {
    return {
        type: RESET_USER_REGISTER_MSG
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
    dispatch(resetLoginUserMsg());
    fetchPost(LOGIN_USER_URL, {username, password}).then((response) => {
        response.json().then((data) => {
            let user = {};
            if (data.user !== false) {
                user = data.user;
                dispatch(receiveLoggedUser(user));
            } else {
                dispatch(receiveLoginUserMsg(ALERT_TYPE_DANGER, 'Přihlášení se nezdařilo.'));
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const registerUser = (values) => dispatch => {
    dispatch(resetRegisterUserMsg());
    fetchPost(REGISTER_USER_URL, values).then((response) => {
        response.json().then((data) => {
            if (data.msg.success === true) {
                dispatch(receiveRegisterUserMsg(ALERT_TYPE_SUCCESS, data.msg.text));
            } else {
                dispatch(receiveRegisterUserMsg(ALERT_TYPE_DANGER, data.msg.text));
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}