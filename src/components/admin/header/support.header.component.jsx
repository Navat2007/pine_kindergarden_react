import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import Button from "../button/button.component";
import Popup from "../../popup/popup.component";
import FieldInput from "../../general/field/field.input.component";

import useAuthStore from "../../../store/authStore";
import AlertPopup from "../../alert.popup/alert.popup";

import "./support.scss";
import { AdminIcons } from "../../svgs";

const SupportHeaderComponent = () => {
    const { user } = useAuthStore();

    const { register, handleSubmit, reset } = useForm();
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupNotifOpened, setPopupNotifOpened] = React.useState(false);
    const [sending, setSending] = React.useState(false);

    const onSendSubmit = async (params) => {
        setSending(true);

        params["fio"] = user.fio;
        params["org"] = user.org_name;

        let form = new FormData();
        window.global.buildFormData(form, params);

        await axios.postForm(window.global.baseUrl + "php/models/support/send.php", form);
        await axios.postForm(window.global.baseUrl + "php/email/support.php", form);

        reset();

        setSending(false);

        setPopupOpened(false);
        setPopupNotifOpened(true);
    };

    return (
        <>
            <Button
                type='button'
                theme={"outline"}
                iconName={AdminIcons.question}
                aria-label='Задать вопрос'
                extraClass='support-button'
                onClick={() => setPopupOpened(true)}
            >
                Поддержка
            </Button>
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
                            placeholder={
                                "Ваш вопрос... \n(если Ваш вопрос касается конкретного театра, заявки, педагога и т.п., указывайте пожалуйста его ID)"
                            }
                            required={true}
                            {...register("text")}
                        />
                    </fieldset>
                    <Button type='submit' spinnerActive={sending}>
                        Отправить
                    </Button>
                </form>
            </Popup>
            <AlertPopup
                text='Запрос успешно отправлен'
                state='success'
                timerInSeconds={3}
                opened={popupNotifOpened}
                onClose={() => setPopupNotifOpened(false)}
            />
        </>
    );
};

export default SupportHeaderComponent;
