import React, { forwardRef } from "react";

import "./field.scss";

const FieldEmail = ({ errorText, extraClass, hasLabel = true, labelText, required = false, ...rest }, ref) => {
    return (
        <div className={`field${extraClass ? ` ${extraClass}` : ``}${errorText ? ` field_state_error` : ``}`}>
            {hasLabel && (
                <label className={`field__label ${extraClass ? ` ${extraClass}-label` : ``}`} htmlFor='search'>
                    {labelText}
                </label>
            )}
            <div className={`field__inner ${extraClass ? ` ${extraClass}-inner` : ``}`}>
                <input
                    ref={ref}
                    className={`field__input ${extraClass ? ` ${extraClass}-input` : ``}`}
                    id='search'
                    type='search'
                    autoComplete='off'
                    name='search'
                    required={required}
                    {...rest}
                />
                <span className={`field__info-text ${extraClass ? ` ${extraClass}-info-text` : ``}`}>{errorText}</span>
            </div>
        </div>
    );
};

export default forwardRef(FieldEmail);
