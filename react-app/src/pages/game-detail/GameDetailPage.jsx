import React, {Component} from 'react';
import GameDetailRepository from './../../containers/game-detail/GameDetailRepository'
import {store} from "../../containers/DispatchingApp";
import {loadGameDetail, loadGameDetailEvents, resetGameDetail} from "../../actions/game-detail/GameDetailActions";


class GameDetailPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const gameId = this.props.match.params.id;

        store.dispatch(resetGameDetail());
        store.dispatch(loadGameDetail(gameId))
        store.dispatch(loadGameDetailEvents(gameId));
    }

    render() {
        return (
            <div>
                <GameDetailRepository/>
            </div>
        );
    }
}

export default GameDetailPage;
