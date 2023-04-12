import React, { ChangeEvent } from "react";
import { Field } from "./defaultStyles";

interface SearchFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchField: React.FC = (props: SearchFieldProps) => {
  return (
    <div className="mb-3">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <Field
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      </span>
    </div>
  );
}

export default SearchField;