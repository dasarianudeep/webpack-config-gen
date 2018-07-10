import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./style.css";

function Panel(props) {
    return (
        <div className={`panel__wrapper ${cx(props.className)}`}>
            <div className="panel__title">{props.title}</div>
            <div className="panel__body">{props.children}</div>
        </div>
    );
}

Panel.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
};

export default Panel;
