import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import GameListElement from "./GameListElement";

class GameList extends Component {
    render() {
        const {games} = this.props

        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Datum</th>
                    <th>Hřiště</th>
                    <th>Domácí</th>
                    <th>Hosté</th>
                    <th>Stav</th>
                    <th>Výsledek</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {games.map((game, index) => {
                    return <GameListElement key={index} game={game} />
                })}
                </tbody>
            </Table>
        );
    }
}

export default GameList;
