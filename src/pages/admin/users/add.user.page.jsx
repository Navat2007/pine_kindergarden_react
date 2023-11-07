import React from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";

import TitleBlock from "../../../components/admin/title.block/title.block.component";
import Button from "../../../components/admin/button/button.component";
import FieldEmail from "../../../components/admin/field/field.email.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldPhone from "../../../components/admin/field/field.phone.component";
import FieldPassword from "../../../components/admin/field/field.password.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";

const AddUserPage = () => {
    const navigate = useNavigate();

    const back = () => navigate("/admin/users");

    const store = useUsersStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {
        reset();
    }, []);

    React.useEffect(() => {
        if (store.error) setPopupErrorOpened(true);
    }, [store.error]);

    const onAddSubmit = async (params) => {
        await store.add(params);

        if (!store.error) back();
    };

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={"Создание администратора"} onBack={back}/>
            <form onSubmit={handleSubmit(onAddSubmit)} className='admin-form'>
                <div className='admin-form__two-columns'>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Основная информация</h2>
                        <FieldEmail
                            placeholder={"Введите email..."}
                            required={true}
                            {...register("email")}
                        />
                        <FieldText
                            label={"ФИО"}
                            placeholder={"Введите фио..."}
                            required={true}
                            {...register("fio")}
                        />
                        <FieldPhone
                            label={"Контактный телефон"}
                            placeholder={"Введите контактный телефон..."}
                            required={true}
                            {...register("phone")}
                        />
                    </fieldset>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Безопасность</h2>
                        <FieldPassword
                            autoComplete={"new-password"}
                            required={true}
                            {...register("password", {
                                minLength: {
                                    value: 6,
                                    message: "Минимальная длина пароля 6 символов",
                                },
                            })}
                            errorText={errors?.password && errors.password.message}
                        />
                        <FieldCheckbox
                            label={"Активировать учетную запись?"}
                            {...register("active", {value: true})}
                        />
                    </fieldset>
                </div>
                <div className='admin-form__controls'>
                    <Button
                        extraClass={"admin-form__button"}
                        type='submit'
                        spinnerActive={store.sending}>
                        Создать
                    </Button>
                </div>
            </form>
            <AlertPopup
                title={"Ошибка!"}
                state='error'
                text={store.errorText}
                opened={popupErrorOpened}
                onClose={() => {
                    store.clearErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </BasicPage>
    );
};

export default AddUserPage;
