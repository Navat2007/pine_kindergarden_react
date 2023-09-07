import React from "react";
import "./field.scss";

const FieldEmail = () => {
    return (
        <div className='field'>
            <label className='field__label' htmlFor='email'>
                E-mail
            </label>
            <div className='field__inner'>
                <input
                    className='field__input'
                    id='email'
                    type='email'
                    autoComplete='email'
                    name='email'
                    placeholder='Введите email...'
                    required
                />
                <span className='field__info-text'>Поле для вывода ошибки</span>
            </div>
        </div>
    );
};

export default FieldEmail;
