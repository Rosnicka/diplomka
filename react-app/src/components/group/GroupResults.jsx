import React from 'react';
import {Table} from 'react-bootstrap'
import TeamGroupResultElement from "./TeamGroupResultElement";

const GroupResults = (props) => {
    const {teamsResults} = props;

    return (
        <Table striped bordered condensed hover>
            <thead>
            <tr>
                <th>Pořadí</th>
                <th>Název týmu</th>
                <th>Odehrané zápasy</th>
                <th>Výhry</th>
                <th>Remízy</th>
                <th>Prohry</th>
                <th>Skóre</th>
                <th>Body</th>
            </tr>
            </thead>
            <tbody>
            {teamsResults.map((teamResults, index) => {
                return <TeamGroupResultElement key={index} results={teamResults}/>
            })}
            </tbody>
        </Table>
    );
};

export default GroupResults;
