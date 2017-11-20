import React, {Component} from 'react';
import GameListElement from "./GameListElement";

class GameList extends Component {
    render() {
        const {games} = this.props

        return (
            <div>
                {games.map(game => {
                    return <GameListElement key={game.id} game={game} />
                })}
            </div>
        );
    }
}

export default GameList;
