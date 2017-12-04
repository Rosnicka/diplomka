import React from 'react';

const GameListElement = (props) => {
    const {game} = props;

    const result = () => {
        let resultClass = 'label label-default';

        if (game.result === null) {
            return (
                <span className={resultClass}>
                    ---
                </span>
            )
        } else {
            if (game.result.home > game.result.host) {
                resultClass = 'label label-success';
            } else if (game.result.home === game.result.host) {
                resultClass = 'label label-info';
            } else {
                resultClass = 'label label-danger';
            }

            return (
                <span className={resultClass}>
                    {game.result.home} : {game.result.host}
                </span>
            )
        }
    }

    return (
        <tr>
            <td>{game.date}</td>
            <td>{game.field}</td>
            <td>{game.home}</td>
            <td>{game.host}</td>
            <td>{game.state}</td>
            <td className="text-center">{result()}</td>
            <th>
                <button className="btn btn-sm btn-info">Detail zápasu</button>
            </th>
        </tr>
    );
};

export default GameListElement;
