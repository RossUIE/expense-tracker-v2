import React, {useState} from "react";
import AtSymbol from "../svg/atSymbol/at-symbol";
import PasswordIcon from "../svg/PasswordIcon/password-icon";
import AccountIcon from "../svg/AccountIcon/account-icon";

import './form-input.scss';

const FormInput = ({ handleChange, label, type, ...otherProps}) => {

    let inputIcon = null;

    if(type === 'email') {
        inputIcon = <AtSymbol/>
    } else if(type === 'password') {
        inputIcon = <PasswordIcon/>
    } else if(type === 'text') {
        inputIcon = <AccountIcon/>
    }

    return (
    <div className="group">
        <div className="input-icons">{inputIcon}</div>
        <input className="form-input" onChange={handleChange} {...otherProps}/>
        {
            label ?
            <label className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}>
                {label}
            </label>
            : 
            null
        }
    </div>
    ) 
};

export default FormInput;