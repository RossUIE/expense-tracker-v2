import React, {useState} from "react";
import ForgotPasswordIllustration from "../../components/svg/ForgotPasswordIllustration/forgot-password-illsutarion";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import BackButton from '../../components/svg/BackButton/back-button';
import { NavLink } from 'react-router-dom';

import './forgot-password.scss';

export const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        const { value, name } = event.target;
    
        if (name === "email") {
          setEmail(value);
        }
      };

    return (
        <div className="forgot-password">
            <NavLink to="/signin">
                <div className="back">
                    <BackButton/>
                </div>
            </NavLink>
            <div className="forgot-password-illustration">
                <ForgotPasswordIllustration/>
            </div>
            <div className="forgot-password-title">
                <h1>Forgot password</h1>
                <p>Input your email address below and an email will be sent to your inbox</p>
            </div>
            <div className="forgot-password-content">
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    handleChange={handleChange}
                    label={"Email"}
                    required
                />
                 <CustomButton>Send email</CustomButton>
            </div>
        </div>
    )
}

export default ForgotPassword;