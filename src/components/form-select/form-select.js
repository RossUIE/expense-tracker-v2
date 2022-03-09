import React from "react";

const FormSelect = ({ handleChange, label, options, value, ...otherProps }) => {
  return (
    <div className="group">
      <label htmlFor="category">Category:</label>
      <div className="select-dropdown">
        <select onChange={handleChange} value={value} {...otherProps}>
          {options?.map((option, key) => (
            <option key={key}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
