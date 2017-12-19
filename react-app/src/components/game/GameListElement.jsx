import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {getGameStateLabel} from "../../constants/GameStateTypes";

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
            <td>{game.datetime}</td>
            <td>{game.field}</td>
            <td>{game.home.name}</td>
            <td>{game.host.name}</td>
            <td>{getGameStateLabel(game.state)}</td>
            <td className="text-center">{result()}</td>
            <th>
                <LinkContainer to={'/zapasy/' + game.id}>
                    <button className="btn btn-sm btn-info">Detail zápasu</button>
                </LinkContainer>
            </th>
        </tr>
    );
};

export default GameListElement;
