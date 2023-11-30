import React, { forwardRef } from "react";

import "./field.scss";

const FieldCheckbox = (
    { errorText, extraClass, label = "", visuallyLabel = true, placeholder = "", required = false, ...rest },
    ref
) => {
    const id = window.global.makeid(8);

    return (
        <div
            className={`field field_content_checkbox${errorText ? ` field_state_error` : ``}${
                extraClass ? ` ${extraClass}` : ``
            }`}
        >
            <label
                className={`field__label${extraClass ? ` ${extraClass}-label` : ``}${
                    !visuallyLabel ? ` visually-hidden` : ``
                }`}
                htmlFor={id}
            >
                {label}
            </label>
            <div className={`field__inner${extraClass ? ` ${extraClass}-inner` : ``}`}>
                <input
                    ref={ref}
                    className={`field__checkbox${extraClass ? ` ${extraClass}-checkbox` : ``}`}
                    id={id}
                    type='checkbox'
                    name='checkbox'
                    placeholder={placeholder}
                    required={required}
                    {...rest}
                />
            </div>
            <span className={`field__info-text${extraClass ? ` ${extraClass}-info-text` : ``}`}>{errorText}</span>
        </div>
    );
};

export default forwardRef(FieldCheckbox);
