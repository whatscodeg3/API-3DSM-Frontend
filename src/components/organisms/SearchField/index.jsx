import React from "react";

import { Field } from "./defaultStyles";

function SearchField(props){
    return (
        <div className="mb-3" >
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <Field value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
            </span>
        </div>
    )
}

export default SearchField