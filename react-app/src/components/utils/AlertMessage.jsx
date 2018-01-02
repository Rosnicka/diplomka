import React from 'react';
import {Alert} from 'react-bootstrap'

const AlertMessage = (props) => {
    const {type, text} = props;

    return (
        <Alert bsStyle={type}>
            {text}
        </Alert>
    );
};

export default AlertMessage;

export const ALERT_TYPE_DANGER = 'danger';
export const ALERT_TYPE_WARNING = 'warning';
export const ALERT_TYPE_SUCCESS = 'success';
export const ALERT_TYPE_INFO = 'info';