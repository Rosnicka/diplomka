import React from 'react';

const LoadingSpinner = (props) => {
    return (
        <div className="alert alert-info">
            {props.text}
            <span className="loading-spinner glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
        </div>
    );
};

export default LoadingSpinner;