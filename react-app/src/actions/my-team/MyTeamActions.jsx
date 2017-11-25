import {IS_FETCHING_TEAM, RECEIVE_MY_TEAM, RECEIVE_MY_TEAM_APPLICATION} from "../../constants/MyTeamActionTypes";
import {APPLICATIONS_URL, getTeamByIdUrl, TEAMS_URL} from "../../constants/Routes";
import {fetchPost, fetchGet} from "../../utils/FetchMethods";
import {store} from "../../containers/DispatchingApp";

const receiveMyTeam = team => {
    return {
        type: RECEIVE_MY_TEAM,
        team: team
    }
}

const receiveMyTeamApplication = application => {
    return {
        type: RECEIVE_MY_TEAM_APPLICATION,
        application: application
    }
}

export const isFetchingTeam = (isFetching) => {
    return {
        type: IS_FETCHING_TEAM,
        isFetching: isFetching,
    }
}

export const getMyTeam = (teamId) => dispatch => {
    fetchGet(getTeamByIdUrl(teamId)).then((response) => {
        response.json().then((data) => {
            let team = {};
            if (data.data !== false) {
                team = data.data;
            }
            dispatch(receiveMyTeam(team))
            dispatch(isFetchingTeam(false))
        });
    }).catch(function (error) {
        console.log(error);
    });
};

export const createTeam = (values) => dispatch => {
    const state = store.getState();
    values.administrator = state.users.userIdentity.id
    fetchPost(TEAMS_URL, values).then((response) => {
        response.json().then((data) => {
            let team = {};
            if (data.data !== false) {
                team = data.data;
            }
            dispatch(receiveMyTeam(team))
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const createTeamApplication = (values) => dispatch => {
    fetchPost(APPLICATIONS_URL, values).then((response) => {
        response.json().then((data) => {
            let application = {};
            if (data.data !== false) {
                application = data.data;
            }
            dispatch(receiveMyTeamApplication(application))
        });
    }).catch(function (error) {
        console.log(error);
    });
}