import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./style.css";

function TextInput(props) {
    return (
        <div className={`textinput__wrapper ${cx(props.className)}`}>
            <label htmlFor={props.id}>{props.children}</label>
            <input
                className="textinput__control"
                id={props.id}
                type="text"
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            />
        </div>
    );
}

TextInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    textinputOnChange: PropTypes.func
};
export default TextInput;
