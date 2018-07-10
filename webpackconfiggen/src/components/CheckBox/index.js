import React from "react";
import cx from "classnames";
import "./style.css";

function CheckBox(props) {
    return (
        <div className={`checkbox__wrapper ${props.className}`}>
            <input type="checkbox"
                   id={props.id} name={props.name} checked={props.checked} onChange={props.onChange}
                   disabled={props.disabled} value={props.value}/>
            <label className="checkbox__label" htmlFor={props.id}>{props.children}</label>
        </div>
    )
}

export default CheckBox;
