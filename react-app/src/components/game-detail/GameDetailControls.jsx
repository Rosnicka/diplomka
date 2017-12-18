import React from 'react';
import {Col} from 'react-bootstrap'

const GameDetailControls = (props) => {
    return (
        <Col xs={6} xsOffset={3} className="text-center">
            <button className="btn btn-info">Pozastavit zápas</button>
            <button className="btn btn-danger">Ukončit zápas</button>
        </Col>
    );
};

export default GameDetailControls;
