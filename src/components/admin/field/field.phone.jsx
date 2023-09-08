import React, {forwardRef} from "react";

import "./field.scss";

const FieldEmail = ({errorText, required = false, ...rest}, ref) => {
    return (
        <div className={`field${errorText ? " field_state_error" : ""}`}>
            <label className='field__label' htmlFor='email'>
                E-mail
            </label>
            <div className='field__inner'>
                <input
                    ref={ref}
                    className='field__input'
                    type='phone'
                    autoComplete='phone'
                    name='phone'
                    placeholder='+7(___)___-__-__'
                    pattern='\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}'
                    required={required}
                    {...rest}
                />
                <span className='field__info-text'>{errorText}</span>
            </div>
        </div>
    );
};

export default forwardRef(FieldEmail);
