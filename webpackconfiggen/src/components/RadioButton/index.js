import React from "react";
//import PropTypes from "prop-types";
import "./style.css";

function RadioButton(props) {
    return (
        <div className={"radio__wrapper " + (props.className || "")}>
            <input
                type="radio"
                id={props.id}
                name={props.name}
                disabled={props.disabled}
                onChange={props.onChange}
                value={props.value}
                checked={props.checked}
            />
            <label className="radiobutton__label" htmlFor={props.id}>
                {props.children}
            </label>
        </div>
    );
}

export default RadioButton;
