import React from 'react';
import PropTypes from 'prop-types';

const Notify = (props) => {
    if (props.error)
        console.error(props.error);
    return (
        <div className="center-content notify-content">
            <h1 className={props.classVal}>{props.message}</h1>
        </div>
    );
}

Notify.propTypes = {
    message: PropTypes.string.isRequired,
    classVal: PropTypes.string,
    error: PropTypes.object
}

export default Notify;