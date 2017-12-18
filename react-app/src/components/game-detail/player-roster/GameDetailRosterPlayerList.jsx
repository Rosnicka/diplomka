import React from 'react';
import {Table} from 'react-bootstrap'
import GameDetailRosterPlayerElement from "./GameDetailRosterPlayerElement";

const GameDetailRosterPlayerList = (props) => {
    const {playersOnRoster} = props;

    const listPlayers = () => {
        return (
            playersOnRoster.map((player, index) => {
                return <GameDetailRosterPlayerElement key={index} player={player} {...props} />;
            })
        )
    }

    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Hráč</th>
                <th>Akce</th>
            </tr>
            </thead>
            <tbody>
                {listPlayers()}
            </tbody>
        </Table>
    );
};

export default GameDetailRosterPlayerList;