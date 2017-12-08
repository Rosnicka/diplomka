import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import PlayerListElement from "./PlayerListElement";

class PlayerList extends Component {
    render() {
        const {players, onDeletePlayer} = this.props;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th>Příjmení</th>
                        <th>Rodné číslo</th>
                        <th>Góly</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                {players.map((player) => {
                    return <PlayerListElement key={player.id} player={player} onDeletePlayer={onDeletePlayer}/>
                })}
                </tbody>
            </Table>
        );
    }
}

export default PlayerList;
