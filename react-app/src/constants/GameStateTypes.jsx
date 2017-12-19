export const GAME_STATE_FILLING_ROSTER = 'filling_roster';
export const GAME_STATE_PREPARED = 'prepared';
export const GAME_STATE_PLAYING = 'playing';
export const GAME_STATE_PAUSED = 'paused';
export const GAME_STATE_FINISHED = 'finished';
export const GAME_STATE_CLOSED = 'closed';

export const getGameStateLabel = (state) => {
    switch (state) {
        case GAME_STATE_FILLING_ROSTER:
            return 'Čeká na vyplnění soupisky';
        case GAME_STATE_PREPARED:
            return 'Čeká na zahájení';
        case GAME_STATE_PLAYING:
            return 'Právě se hraje';
        case GAME_STATE_PAUSED:
            return 'Pozastaven';
        case GAME_STATE_FINISHED:
            return 'Dohráno';
        case GAME_STATE_CLOSED:
            return 'Uzavřen';
        default:
            return '';
    }
}