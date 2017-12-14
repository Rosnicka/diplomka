export const TEAMS_URL = '/api/v1/teams';
export const PLAYERS_URL = '/api/v1/players';
export const GAMES_URL = '/api/v1/games';
export const FIELDS_URL = '/api/v1/fields';
export const APPLICATIONS_URL = '/api/v1/applications';
export const FIELD_LOCATIONS_URL = '/api/v1/field-locations';

export const LOGGED_USER_URL = '/api/v1/users/logged'
export const LOGIN_USER_URL = '/api/v1/users/login'

export const getGameByIdUrl = (gameId) => {
    return GAMES_URL + '/' + gameId;
}

export const getTeamByIdUrl = (teamId) => {
    return TEAMS_URL + '/' + teamId;
}

export const getTeamPlayersByTeamIdUrl = (teamId) => {
    return getTeamByIdUrl(teamId) + '/players';
}

export const getTeamGamesToPlayByTeamIdUrl = (teamId) => {
    return getTeamByIdUrl(teamId) + '/gamesToPlay';
}

export const getTeamGamesAsRefereeByTeamIdUrl = (teamId) => {
    return getTeamByIdUrl(teamId) + '/gamesAsReferee';
}

export const getGameEventsByGameId = (gameId) => {
    return getGameByIdUrl(gameId) + '/events'
}

export const getGamePlayersByGameIdUrl = (gameId) => {
    return getGameByIdUrl(gameId) + '/players'
}

export const getRemovePlayerFromGameUrl = (gameId, playerId) => {
    return getGamePlayersByGameIdUrl(gameId) + '/' + playerId
}

export const getGameTeamPlayers = (gameId, teamId) => {
    return getGameByIdUrl(gameId) + '/teamPlayers/' + teamId
}