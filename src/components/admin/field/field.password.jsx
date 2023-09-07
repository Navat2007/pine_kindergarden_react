import React from "react";
import "./field.scss";

const FieldPassword = () => {
    return (
        <div className='field'>
            <label className='field__label' htmlFor='password'>
                Пароль
            </label>
            <div className='field__inner'>
                <input
                    className='field__input'
                    id='password'
                    type='password'
                    autoComplete='password'
                    name='password'
                    placeholder='Введите пароль...'
                    required
                    maxLength={"8"}
                    minLength={"8"}
                />
                <span className='field__info-text'>Поле для вывода ошибки</span>
                <span className='field__icon-eye field__icon-eye_active' aria-label='Скрыть/Отобразить пароль'></span>
            </div>
        </div>
    );
};

export default FieldPassword;
