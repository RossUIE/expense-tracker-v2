import React, {useState} from "react";
import AtSymbol from "../svg/atSymbol/at-symbol";
import PasswordIcon from "../svg/PasswordIcon/password-icon";
import AccountIcon from "../svg/AccountIcon/account-icon";
import PoundCurrency from '../svg/PoundCurrency/PoundCurrency';
import PencilIcon from "../svg/PencilIcon/PencilIcon";

import './form-input.scss';

const FormInput = ({ handleChange, label, ...otherProps}) => {

    let inputIcon = null;

    if(otherProps.type === 'email') {
        inputIcon = <AtSymbol/>
    } else if(otherProps.type === 'password') {
        inputIcon = <PasswordIcon/>
    } else if(otherProps.type === 'text') {
        inputIcon = <AccountIcon/>
    } else if(otherProps.type === 'number') {
        inputIcon = <PoundCurrency/>
    } else {
        return
    }

    if(otherProps.title) {
        inputIcon = <PencilIcon/>
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