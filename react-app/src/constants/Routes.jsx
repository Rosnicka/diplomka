export const TEAMS_URL = '/api/v1/teams';
export const PLAYERS_URL = '/api/v1/players';
export const FIELDS_URL = '/api/v1/fields';

export const LOGGED_USER_URL = '/api/v1/users/logged'
export const LOGIN_USER_URL = '/api/v1/users/login'

export const getTeamByIdUrl = (teamId) => {
    return TEAMS_URL + '/' + teamId;
}