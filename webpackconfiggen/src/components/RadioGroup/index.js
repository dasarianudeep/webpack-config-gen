import React from "react";
import RadioButton from "../RadioButton";

function RadioGroup(props) {
    return (
     <div className="radiogroup__wrapper">
         {
             props.radioOptions.length > 0 && (
                 props.radioOptions.map((option, key) => {
                     return (
                         <RadioButton key={option.value} id={(option.value || option.name)+"_id"}
                                      name={option.name} value={option.value}
                                      checked={props.selOption === option.value} onChange={props.onChange}>
                             {option.label}
                         </RadioButton>
                     )
                 })
             )
         }
     </div>
    )
}

export default RadioGroup;
