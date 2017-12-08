import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

const PlayerListElement = (props) => {
    const {player, onDeletePlayer} = props;

    const onDeleteRow = () => {
        const result = confirm('Opravdu chcete odebrat hráče ' + player.first_name + ' ' + player.last_name + '?');
        if (result) {
            onDeletePlayer(player.id);
        }
    }

    return (
        <tr>
            <td>{player.number}</td>
            <td>{player.first_name}</td>
            <td>{player.last_name}</td>
            <td>{player.birth_number}</td>
            <td>{Math.floor((Math.random() * 10) + 1)}</td>
            <td>
                <LinkContainer to={'/hraci/' + player.id}>
                    <button className="btn btn-info btn-sm">Editovat</button>
                </LinkContainer>
                <button className="btn btn-danger btn-sm" onClick={onDeleteRow}>Odebrat</button>
            </td>
        </tr>
    );
}

export default PlayerListElement;
