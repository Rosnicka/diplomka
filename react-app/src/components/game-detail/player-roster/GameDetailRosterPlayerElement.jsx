import React from 'react';
import {Col, Row, Button} from 'react-bootstrap'

const GameDetailRosterPlayerElement = (props) => {
    const {player, onClickRemovePlayerFromRoaster} = props;

    return (
        <Row className="game-detail__player">
            <Col xs={1}>{player.number}</Col>
            <Col xs={5}>{player.first_name} {player.last_name}</Col>
            <Col xs={6} className="actions">
                <Button bsStyle="danger" bsSize="small" onClick={() => onClickRemovePlayerFromRoaster(player.id)}>Odebrat ze soupisky</Button>
            </Col>
        </Row>
    );
};

export default GameDetailRosterPlayerElement;
