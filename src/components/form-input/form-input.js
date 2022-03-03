import React from "react";

import "./form-input.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  let inputIcon = null;

  if (otherProps.type === "email") {
    inputIcon = <i className="material-icons">alternate_email</i>;
  } else if (otherProps.type === "password") {
    inputIcon = <i className="material-icons">lock</i>;
  } else if (otherProps.type === "text") {
    inputIcon = <i className="material-icons">person_outline</i>;
  } else if (otherProps.type === "number") {
    inputIcon = <i className="material-icons">currency_pound</i>;
  } else {
    return;
  }

  if (otherProps.title) {
    inputIcon = <i className="material-icons">receipt_long</i>;
  }

  if (otherProps.search) {
    inputIcon = <i className="material-icons">search</i>;
  }

  return (
    <div className="group">
      <div className={otherProps.search ? "input-icons search" : "input-icons"}>
        {inputIcon}
      </div>
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={
            otherProps.search
              ? "search-input"
              : `${otherProps.value.length ? "shrink" : ""} form-input-label`
          }
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
