import React from 'react';

const PlayerListElement = (props) => {
    const {player} = props;

    return (
        <tr>
            <td>{player.number}</td>
            <td>{player.first_name}</td>
            <td>{player.last_name}</td>
            <td>{player.birth_number}</td>
            <td>{Math.floor((Math.random() * 10) + 1)}</td>
            <td>
                <button className="btn btn-info btn-sm">Editovat</button>
                <button className="btn btn-danger btn-sm">Smazat</button>
            </td>
        </tr>
    );
}

export default PlayerListElement;
