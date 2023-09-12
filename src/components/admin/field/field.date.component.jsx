import React, { forwardRef } from "react";

import "./field.scss";

const FieldDate = ({ errorText, extraClass, label = "", placeholder = "", required = false, ...rest }, ref) => {
    const id = window.global.makeid(8);

    return (
        <div className={`field${errorText ? ` field_state_error` : ``}${extraClass ? ` ${extraClass}` : ``}`}>
            <label className={`field__label${extraClass ? ` ${extraClass}-label` : ``}`} htmlFor={id}>
                {label}
            </label>
            <div className={`field__inner${extraClass ? ` ${extraClass}-inner` : ``}`}>
                <input
                    ref={ref}
                    className={`field__input${extraClass ? ` ${extraClass}-input` : ``}`}
                    id={id}
                    type='date'
                    name='date'
                    placeholder={placeholder}
                    required={required}
                    {...rest}
                />
                <span className={`field__info-text${extraClass ? ` ${extraClass}-info-text` : ``}`}>{errorText}</span>
            </div>
        </div>
    );
};

export default forwardRef(FieldDate);
