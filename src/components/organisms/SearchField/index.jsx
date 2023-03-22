import React from "react";

import { Field } from "./defaultStyles";

function SearchField(props){
    return(
        <Field value={props.value}  onChange={props.onChange} placeholder={props.placeholder}/>
    )
}

export default SearchField