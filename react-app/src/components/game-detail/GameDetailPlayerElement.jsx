import React from 'react';
import {Col, Row, Button} from 'react-bootstrap'

const GameDetailPlayerElement = (props) => {
    const {player} = props;
    return (
        <Row className="game-detail__player">
            <Col xs={1}>{player.number}</Col>
            <Col xs={5}>{player.first_name} {player.last_name}</Col>
            <Col xs={6} className="actions">
                <Button bsStyle="success" bsSize="small">Gól</Button>
                <Button bsStyle="info" bsSize="small">Asistence</Button>
                <Button bsStyle="warning" bsSize="small">Žl. karta</Button>
                <Button bsStyle="danger" bsSize="small">Č. karta</Button>
            </Col>
        </Row>
    );
};

export default GameDetailPlayerElement;
