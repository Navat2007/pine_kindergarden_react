import React from "react";
import "./field.scss";

const Field = () => {
    return (
        <div className='field'>
            <label htmlFor='password'>Пароль</label>
            <div className='field__inner'>
                <input
                    className='field__input'
                    id='password'
                    type='password'
                    autoComplete='password'
                    name='password'
                    placeholder='Введите пароль...'
                    required
                    maxLength={8}
                    minLength={8}
                />
                <span className='field__span'>Поле для вывода ошибки</span>
            </div>
        </div>
    );
};

export default Field;
