import React, {Component} from 'react';
import moment from 'moment'
import {GAME_STATE_PLAYING} from "../../constants/GameStateTypes";

class Stopwatch extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.props.gameState === GAME_STATE_PLAYING && this.props.gameElapsedSeconds !== false) {
                this.props.onGameIntervalTick()
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderTime() {
        if (this.props.gameElapsedSeconds === false) {
            return '';
        }

        let duration = moment.duration(this.props.gameElapsedSeconds, 'seconds');

        if (this.props.gameState === GAME_STATE_PLAYING) {
            const start = moment(this.props.startDatetime);
            const now = moment();
            duration.add(now.diff(start));
        }

        const minutes = duration.minutes() < 10 ? ('0' + duration.minutes()) : duration.minutes();
        const seconds = duration.seconds() < 10 ? ('0' + duration.seconds()) : duration.seconds();

        return minutes + ':' + seconds;
    }

    render() {
        return (
            <div>{this.renderTime()}</div>
        )
    }
};

export default Stopwatch;
