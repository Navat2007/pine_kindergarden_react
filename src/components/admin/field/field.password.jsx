import React from "react";
import "./field.scss";

const FieldPassword = () => {
    const [eyeActive, setEyeActive] = React.useState(false);

    const toggleEye = (e) => {
        setEyeActive(!eyeActive);
    };

    return (
        <div className='field'>
            <label className='field__label' htmlFor='password'>
                Пароль
            </label>
            <div className='field__inner'>
                <input
                    className='field__input'
                    id='password'
                    type={`${eyeActive ? "text" : "password"}`}
                    autoComplete='password'
                    name='password'
                    placeholder='Введите пароль...'
                    required
                    maxLength={16}
                    minLength={3}
                />
                <span className='field__info-text'>Поле для вывода ошибки</span>
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

export default FieldPassword;
