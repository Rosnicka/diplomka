import React from 'react';

const TeamGroupResultElement = (props) => {
    const {results} = props;

    return (
        <tr>
            <td>{results.rank}</td>
            <td>{results.teamName}</td>
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
