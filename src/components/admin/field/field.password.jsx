import React, {forwardRef} from "react";

import "./field.scss";

const FieldPassword = ({errorText, required = false, ...rest}, ref) => {
    const [eyeActive, setEyeActive] = React.useState(false);

    const toggleEye = (e) => {
        setEyeActive(!eyeActive);
    };

    return (
        <div className={`field${errorText ? " field_state_error" : ""}`}>
            <label className='field__label' htmlFor='password'>
                Пароль
            </label>
            <div className='field__inner'>
                <input
                    className='field__input'
                    type={`${eyeActive ? "text" : "password"}`}
                    ref={ref}
                    autoComplete='password'
                    name='password'
                    placeholder='Введите пароль...'
                    required={required}
                    maxLength={16}
                    minLength={3}
                    {...rest}
                />
                <span className='field__info-text'>{errorText}</span>
                <span
                    className={`field__icon-eye${eyeActive ? " field__icon-eye_active" : ""}`}
                    aria-label='Скрыть/Отобразить пароль'
                    onClick={toggleEye}
                >
                </span>
            </div>
        </div>
    );
};

export default forwardRef(FieldPassword);
