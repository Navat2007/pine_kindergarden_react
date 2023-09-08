import React from "react";

import { useForm } from "react-hook-form";

import "./feedback.scss";

const Feedback = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

    };

    return (
        <section className='feedback main-section section_type_fixed'>
            <div className='feedback__inner'>
                <div className='feedback__description'>
                    <p className='feedback__description-text'>
                        Хотите сделать своего ребенка счастливым? <br />
                        Приходите&nbsp;к&nbsp;нам
                    </p>
                    <button className='feedback__description-button' type='button' aria-label='Записаться'>
                        <span>Записаться</span>
                    </button>
                </div>
                <form className='feedback__form' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='feedback__title'>Закажите обратный звонок</h2>
                    <input
                        id='phone'
                        className='feedback__field'
                        type='tel'
                        name='phone'
                        autoComplete='phone'
                        required
                        placeholder='+7(___)___-__-__'
                        pattern='\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}'
                    />
                    <textarea
                        id='message'
                        className='feedback__field'
                        rows='4'
                        name='message'
                        placeholder='Ваше сообщение'
                    />
                    <div className='feedback__checkbox-box'>
                        <input type='checkbox' id='privacy' required />
                        <label htmlFor='privacy'>Я согласен на обработку моих данных</label>
                    </div>
                    <span className='feedback__span-text'>Необходимо заполнить номер телефона</span>
                    <button className='feedback__button' type='submit' aria-label='Заказать'>
                        Заказать
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Feedback;
