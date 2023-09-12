import React, {forwardRef} from "react";

import "./field.scss";

const FieldPhone = ({errorText, label = "Телефон", placeholder = "+7(___)___-__-__", required = false, ...rest}, ref) => {
    return (
        <div className={`field${errorText ? " field_state_error" : ""}`}>
            <label className='field__label' htmlFor='phone'>
                {label}
            </label>
            <div className='field__inner'>
                <input
                    ref={ref}
                    className='field__input'
                    id='phone'
                    type='phone'
                    autoComplete='phone'
                    name='phone'
                    placeholder={placeholder}
                    pattern='\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}'
                    required={required}
                    {...rest}
                />
                <span className='field__info-text'>{errorText}</span>
            </div>
        </div>
    );
};

export default forwardRef(FieldPhone);
