import {
    IS_FETCHING_TEAM, RECEIVE_MY_GAMES_AS_REFEREE, RECEIVE_MY_GAMES_TO_PLAY, RECEIVE_MY_PLAYERS, RECEIVE_MY_TEAM,
    RECEIVE_MY_TEAM_APPLICATION, RECEIVE_NEW_PLAYER, RECEIVE_UPDATED_PLAYER, REMOVE_PLAYER
} from "../../constants/MyTeamActionTypes";
import {
    APPLICATIONS_URL, getTeamByIdUrl,
    getTeamGamesAsRefereeByTeamIdUrl, getTeamGamesToPlayByTeamIdUrl, getTeamPlayersByTeamIdUrl, PLAYERS_URL,
    TEAMS_URL
} from "../../constants/Routes";
import {fetchPost, fetchGet, fetchPut, fetchDelete} from "../../utils/FetchMethods";
import {store} from "../../containers/DispatchingApp";

const receiveMyTeam = team => {
    return {
        type: RECEIVE_MY_TEAM,
        team: team
    }
}

const receiveNewPlayer = player => {
    return {
        type: RECEIVE_NEW_PLAYER,
        player: player
    }
}

const receiveUpdatedPlayer = player => {
    return {
        type: RECEIVE_UPDATED_PLAYER,
        player: player
    }
}

const removePlayer = id => {
    return {
        type: REMOVE_PLAYER,
        id: id
    }
}

const receiveMyPlayers = players => {
    return {
        type: RECEIVE_MY_PLAYERS,
        players: players
    }
}

const receiveMyGamesToPlay = games => {
    return {
        type: RECEIVE_MY_GAMES_TO_PLAY,
        games: games
    }
}

const receiveMyGamesAsReferee = games => {
    return {
        type: RECEIVE_MY_GAMES_AS_REFEREE,
        games: games
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

export const getMyGamesToPlay = (teamId) => dispatch => {
    fetchGet(getTeamGamesToPlayByTeamIdUrl(teamId)).then((response) => {
        response.json().then((data) => {
            let games = [];
            if (data.data !== false) {
                games = data.data;
            }
            dispatch(receiveMyGamesToPlay(games))
            // dispatch(isFetchingTeam(false))
        });
    }).catch(function (error) {
        console.log(error);
    });
};

export const getMyGamesAsReferee = (teamId) => dispatch => {
    fetchGet(getTeamGamesAsRefereeByTeamIdUrl(teamId)).then((response) => {
        response.json().then((data) => {
            let games = [];
            if (data.data !== false) {
                games = data.data;
            }
            dispatch(receiveMyGamesAsReferee(games))
            // dispatch(isFetchingTeam(false))
        });
    }).catch(function (error) {
        console.log(error);
    });
};

export const getMyPlayers = (teamId) => dispatch => {
    fetchGet(getTeamPlayersByTeamIdUrl(teamId)).then((response) => {
        response.json().then((data) => {
            let players = [];
            if (data.data !== false) {
                players = data.data;
            }
            dispatch(receiveMyPlayers(players))
            // dispatch(isFetchingTeam(false))
        });
    }).catch(function (error) {
        console.log(error);
    });
};

export const createPlayer = (values) => dispatch => {
    const state = store.getState();
    values['team'] = state.myTeam.myTeam.id;
    fetchPost(PLAYERS_URL, values).then((response) => {
        response.json().then((data) => {
            if (data.data !== false) {
                dispatch(receiveNewPlayer(data.data))
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const deletePlayer = (id) => dispatch => {
    fetchDelete(PLAYERS_URL + '/' + id).then((response) => {
        response.json().then((data) => {
            if (data.data !== false) {
                dispatch(removePlayer(id))
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export const updatePlayer = (id, values) => dispatch => {
    fetchPut(PLAYERS_URL + '/' + id, values).then((response) => {
        response.json().then((data) => {
            if (data.data !== false) {
                dispatch(receiveUpdatedPlayer(data.data))
            }
        });
    }).catch(function (error) {
        console.log(error);
    });
}

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