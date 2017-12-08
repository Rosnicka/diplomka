import React from 'react';
import {Col, Row, Table} from 'react-bootstrap'
import GameDetailEventElement from "./GameDetailEventElement";

const GameDetailEventList = (props) => {
    const {events} = props;

    const listAllEvents = (events) => {
        return (
            events.map((event, index) => {
                return <GameDetailEventElement key={index} gameEvent={event} gameActualResult='2:2'/>
            })
        )
    }

    if (events.length === 0) {
        return '';
    }

    return (
        <Row>
            <h3>Události zápasu</h3>
            <Col xs={12} className="game-event">
                <Table>
                    <thead>
                    <tr>
                        <th>Minuta</th>
                        <th>Co se stalo?</th>
                        <th>Hráč</th>
                        <th>Stav zápasu</th>
                    </tr>
                    </thead>
                    <tbody>
                        {listAllEvents(events)}
                    </tbody>

                </Table>
            </Col>
        </Row>
    );
};

export default GameDetailEventList;
