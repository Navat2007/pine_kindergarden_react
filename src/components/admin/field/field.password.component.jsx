import React, { forwardRef } from "react";

import "./field.scss";

const FieldPassword = (
    {
        errorText,
        extraClass,
        label = "Пароль",
        visuallyLabel = true,
        placeholder = "Введите пароль...",
        required = false,
        ...rest
    },
    ref
) => {
    const [eyeActive, setEyeActive] = React.useState(false);

    const toggleEye = (e) => {
        setEyeActive(!eyeActive);
    };

    return (
        <div className={`field${errorText ? " field_state_error" : ""}${extraClass ? ` ${extraClass}` : ``}`}>
            <label
                className={`field__label${extraClass ? ` ${extraClass}-label` : ``}${
                    !visuallyLabel ? ` visually-hidden` : ``
                }`}
                htmlFor='password'
            >
                {label}
            </label>
            <div className={`field__inner${extraClass ? ` ${extraClass}-inner` : ``}`}>
                <input
                    className={`field__input${extraClass ? ` ${extraClass}-input` : ``}`}
                    id='password'
                    type={`${eyeActive ? "text" : "password"}`}
                    ref={ref}
                    autoComplete='password'
                    name='password'
                    placeholder={placeholder}
                    required={required}
                    maxLength={16}
                    minLength={3}
                    {...rest}
                />
                <span className={`field__info-text${extraClass ? ` ${extraClass}-info-text` : ``}`}>{errorText}</span>
                <span
                    className={`field__icon-eye${eyeActive ? ` field__icon-eye_active` : ``}${
                        extraClass ? ` ${extraClass}-icon-eye` : ``
                    }`}
                    aria-label='Скрыть/Отобразить пароль'
                    onClick={toggleEye}
                ></span>
            </div>
        </div>
    );
};

export default forwardRef(FieldPassword);
