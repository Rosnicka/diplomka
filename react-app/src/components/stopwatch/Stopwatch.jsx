import React, {Component} from 'react';
import {Row} from 'react-bootstrap'
import moment from 'moment'
import {
    GAME_STATE_CLOSED, GAME_STATE_FILLING_ROSTER,
    GAME_STATE_FINISHED, GAME_STATE_PAUSED, GAME_STATE_PLAYING,
    GAME_STATE_PREPARED
} from "../../constants/GameStateTypes";
import {GAME_HALF_TIME_DURATION_IN_MINUTES} from "../../constants/GameHalfTime";

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: null
        }
    }

    componentDidMount() {
        const intervalId = setInterval(() => {
            if (this.props.gameState === GAME_STATE_PLAYING && this.props.gameElapsedSeconds !== false) {
                this.props.onGameIntervalTick()
            }
        }, 1000);

        this.setState({
            intervalId: intervalId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getGameDuration() {
        let duration = moment.duration();
        if (this.props.gameElapsedSeconds !== false) {
            duration.add(this.props.gameElapsedSeconds, 'seconds');
        }
        return duration;
    }

    renderTime() {
        const duration = this.getGameDuration();
        if (duration.asSeconds() === 0) {
            return '';
        }

        const minutes = duration.minutes() < 10 ? ('0' + duration.minutes()) : duration.minutes();
        const seconds = duration.seconds() < 10 ? ('0' + duration.seconds()) : duration.seconds();

        return minutes + ':' + seconds;
    }

    renderGameHalfLabel() {
        const duration = this.getGameDuration();
        const {gameState} = this.props;

        if (gameState === GAME_STATE_FINISHED || gameState === GAME_STATE_CLOSED) {
            return 'konec zápasu';
        } else if (gameState === GAME_STATE_PREPARED) {
            return 'čeká na zahájení';
        } else if (gameState === GAME_STATE_FILLING_ROSTER) {
            return 'čeká na vyplnění soupisky';
        } else if (duration.asMinutes() <= GAME_HALF_TIME_DURATION_IN_MINUTES) {
            return '1. poločas';
        } else if (duration.asMinutes() <= 2 * GAME_HALF_TIME_DURATION_IN_MINUTES) {
            return '2. poločas';
        } else if (gameState === GAME_STATE_PAUSED || gameState === GAME_STATE_PLAYING) {
            return 'prodloužení';
        }
        return '';
    }

    render() {
        return (
            <div>
                <Row className="game-stage">{this.renderGameHalfLabel()}</Row>
                <Row className="timer">{this.renderTime()}</Row>
            </div>
        )
    }
};

export default Stopwatch;
