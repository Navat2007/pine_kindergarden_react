import React, {forwardRef} from "react";

import "./field.scss";

const FieldCheckbox = ({errorText, label = "", placeholder = "", required = false, ...rest}, ref) => {

    const id = window.global.makeid(8);

    return (
        <div className={`field${errorText ? " field_state_error" : ""}`}>
            <label className='field__label' htmlFor={id}>
                {label}
            </label>
            <div className='field__inner'>
                <input
                    ref={ref}
                    className='field__input'
                    id={id}
                    type='checkbox'
                    name='checkbox'
                    placeholder={placeholder}
                    required={required}
                    {...rest}
                />
                <span className='field__info-text'>{errorText}</span>
            </div>
        </div>
    );
};

export default forwardRef(FieldCheckbox);
