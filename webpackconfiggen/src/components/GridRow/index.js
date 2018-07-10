import React from 'react';
import './style.css';
import cx from 'classnames';

function GridRow(props) {
    return (
        <div className={`grid__row ${cx(props.className)}`}>
            {props.children}
        </div>
    )
}


export default GridRow;
