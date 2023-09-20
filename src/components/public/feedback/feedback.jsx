import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import useFeedbackStore from "../../../store/feedbackStore";

import AlertPopup from "../../general/alert.popup/alert.popup";

import "./feedback.scss";

const Feedback = () => {
    const [notif, setNotif] = React.useState(<></>);
    const { register, handleSubmit, setFocus } = useForm();
    const feedbackStore = useFeedbackStore();

    const onSubmit = async (data) => {
        await feedbackStore.sendFeedback(data);

        setNotif(
            <AlertPopup
                text='Запрос успешно отправлен'
                state='success'
                timerInSeconds={3}
                opened={true}
                onClose={() => setNotif(<></>)}
            />
        );
    };

    return (
        <>
            <motion.section
                className='feedback'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <div className='feedback__inner'>
                    <div className='feedback__description'>
                        <p className='feedback__description-text'>
                            Хотите сделать своего ребенка счастливым? <br />
                            Приходите&nbsp;к&nbsp;нам
                        </p>
                        <button
                            className='feedback__description-button'
                            type='button'
                            aria-label='Записаться'
                            onClick={() => {
                                setFocus("phone");
                            }}
                        >
                            <span>Записаться</span>
                        </button>
                    </div>
                    <form className='feedback__form' onSubmit={handleSubmit(onSubmit)}>
                        <h2 className='feedback__title'>Задайте вопрос</h2>
                        <input
                            id='phone'
                            className='feedback__field'
                            type='tel'
                            name='phone'
                            autoComplete='phone'
                            required
                            placeholder='+7(___)___-__-__'
                            pattern='\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}'
                            {...register("phone", {
                                required: "Поле обязательно к заполнению",
                            })}
                        />
                        <textarea
                            id='message'
                            className='feedback__field'
                            rows='4'
                            name='message'
                            placeholder='Ваше сообщение'
                            {...register("message")}
                        />
                        <div className='feedback__checkbox-box'>
                            <input type='checkbox' id='privacy' required />
                            <label htmlFor='privacy'>Я согласен на обработку моих данных</label>
                        </div>
                        <span className='feedback__span-text'>Необходимо заполнить номер телефона</span>
                        <button className='feedback__button' type='submit' aria-label='Заказать'>
                            Отправить
                        </button>
                    </form>
                </div>
            </motion.section>
            {notif}
        </>
    );
};

export default Feedback;
