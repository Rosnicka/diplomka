import React, {Component} from 'react';
import GameList from "../../components/game/GameList";

class GameRepository extends Component {
    constructor() {
        super();
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        this.setState({
            games: [
                {
                    'name' : '',
                    'id': 1
                }
            ]
        })
    }


    render() {
        return (
            <div>
                Zápasy
                <GameList games={this.state.games}/>
            </div>
        );
    }
}

export default GameRepository;
