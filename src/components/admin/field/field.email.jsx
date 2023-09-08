import React from "react";
import "./field.scss";

const FieldEmail = ({errorText, required = false}) => {
    return (
        <div className={`field${errorText ? " field_state_error" : ""}`}>
            <label className='field__label' htmlFor='email'>
                E-mail
            </label>
            <div className='field__inner'>
                <input
                    className='field__input'
                    id='email'
                    type='email'
                    autoComplete='email'
                    name='email'
                    placeholder='Введите email...'
                    required={required}
                />
                <span className='field__info-text'>{errorText}</span>
            </div>
        </div>
    );
};

export default FieldEmail;
