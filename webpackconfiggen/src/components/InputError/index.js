import React from "react";
import { v4 } from "uuid";

import "./style.css";

function InputError(props) {
    return (
        <React.Fragment>
            {
                 (
                    <ul className="error__messages">
                        {
                            props.errorMessages.entry.map(errorMessage => {
                                return (
                                    <li key={v4().substr(0,8)}>{errorMessage}</li>
                                )
                            })
                        }
                        {
                            props.errorMessages.assetdir.map(errorMessage => {
                                return (
                                    <li key={v4().substr(0,8)}>{errorMessage}</li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </React.Fragment>
    )
}

export default InputError;
