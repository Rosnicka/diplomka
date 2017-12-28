import React from 'react';

const TeamGroupResultElement = (props) => {
    const {results, rank} = props;

    return (
        <tr>
            <td>{rank}</td>
            <td>{results.team_name}</td>
            <td>{results.played}</td>
            <td>{results.wins}</td>
            <td>{results.ties}</td>
            <td>{results.loses}</td>
            <td>{results.score}</td>
            <td>{results.points}</td>
        </tr>
    );
};

export default TeamGroupResultElement;
