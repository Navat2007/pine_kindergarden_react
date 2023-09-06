import React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";

import Button from "../button/button.component";
import Popup from "../popup/popup.component";
import FieldInput from "../field/field.input.component";

import useAuthStore from "../../../store/authStore";
import Notif from '../notif/notif.component';

import styles from './support.module.scss';

const SupportHeaderComponent = () => {

    const { user } = useAuthStore();

    const { register, handleSubmit, reset } = useForm();
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupNotifOpened, setPopupNotifOpened] = React.useState(false);
    const [sending, setSending] = React.useState(false);

    const onSendSubmit = async (params) => {

        setSending(true);

        params['fio'] = user.fio;
        params['org'] = user.org_name;

        let form = new FormData();
        window.global.buildFormData(form, params);

        await axios.postForm(window.global.baseUrl + 'php/models/support/send.php', form);
        await axios.postForm(window.global.baseUrl + 'php/email/support.php', form);

        reset();

        setSending(false);

        setPopupOpened(false);
        setPopupNotifOpened(true);

    }

    return (
        <>
            <Button
                type='button'
                theme='outline'
                iconClass='mdi mdi-help'
                extraClass={styles.support}
                aria-label="Задать вопрос"
                text="Поддержка"
                onClick={() => setPopupOpened(true)}
            />
            <Popup
                title={"Отправить запрос в поддержку?"}
                opened={popupOpened}
                onClose={() => {
                    setPopupOpened(false);
                }}
            >
                <form onSubmit={handleSubmit(onSendSubmit)} className='form'>
                    <fieldset className='form__section --content-info'>
                        <FieldInput
                            label={"Email для ответа:"}
                            placeholder={"Введите email..."}
                            required={true}
                            {...register("email", { value: user.email })}
                        />
                        <FieldInput
                            label={"Опишите Ваш вопрос:"}
                            type={"textarea"}
                            rows={10}
                            placeholder={"Ваш вопрос... \n(если Ваш вопрос касается конкретного театра, заявки, педагога и т.п., указывайте пожалуйста его ID)"}
                            required={true}
                            {...register("text")}
                        />
                    </fieldset>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text="Отправить"
                            spinnerActive={sending}
                            style={{ marginLeft: 'auto', display: 'block' }} />
                    </div>
                </form>
            </Popup>
            <Notif
                text="Запрос успешно отправлен"
                state="success"
                timerInSeconds={3}
                opened={popupNotifOpened}
                onClose={() => setPopupNotifOpened(false)}
            />
        </>

    );
};

export default SupportHeaderComponent;