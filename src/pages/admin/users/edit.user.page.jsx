import React from "react";
import {useNavigate, useParams} from "react-router-dom";
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

const EditUserPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const back = () => navigate("/admin/users");

    const store = useUsersStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {
        if(store.item)
            reset(store.item);
    }, [store.item]);

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        if (store.error) setPopupErrorOpened(true);
    }, [store.error]);

    const onEditSubmit = async (params) => {
        params.id = id;
        store.edit(params);

        if (!store.error) back();
    };

    const onDeleteSubmit = async () => {
        await store.remove({id});

        if (!store.error) back();
    };

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Редактирование администратора ID: ${id}`} onBack={back}/>
            <form onSubmit={handleSubmit(onEditSubmit)} className='admin-form'>
                <div className='admin-form__two-columns'>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Основная информация</h2>
                        <FieldEmail
                            placeholder={"Введите email..."}
                            required={true}
                            {...register("email", {
                                value: store.item.email,
                            })}
                        />
                        <FieldText
                            label={"ФИО"}
                            placeholder={"Введите фио..."}
                            required={true}
                            {...register("fio", {value: store.item.fio})}
                        />
                        <FieldPhone
                            label={"Контактный телефон"}
                            placeholder={"Введите контактный телефон..."}
                            required={true}
                            {...register("phone", {
                                value: store.item.phone,
                            })}
                        />
                    </fieldset>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Безопасность</h2>
                        <FieldPassword
                            placeholder={"Введите новый пароль..."}
                            autoComplete={"new-password"}
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
                            {...register("active", {
                                value: store.item.active === "Активен",
                            })}
                        />
                    </fieldset>
                </div>
                <div className='admin-form__controls'>
                    <Button
                        extraClass={"admin-form__button"}
                        type='submit'
                        spinnerActive={store.sending}
                    >
                        Сохранить
                    </Button>
                    <Button
                        type='button'
                        theme='text'
                        extraClass={`admin-form__button${store.sending ? ` --hide` : ``}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setPopupOpened(true);
                        }}
                        spinnerActive={store.sending}
                    >
                        Удалить
                    </Button>
                </div>
            </form>
            <AlertPopup
                text={"Вы уверены что хотите удалить?"}
                opened={popupOpened}
                onClose={() => setPopupOpened(false)}
                buttons={
                    <>
                        <Button
                            type='button'
                            theme='text'
                            onClick={() => setPopupOpened(false)}
                            spinnerActive={store.sending}
                        >
                            Нет
                        </Button>
                        <Button
                            type='button'
                            size='small'
                            theme={"info"}
                            onClick={async () => {
                                setPopupOpened(false);
                                await onDeleteSubmit();
                            }}
                            spinnerActive={store.sending}
                        >
                            Да
                        </Button>
                    </>
                }
            />
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

export default EditUserPage;
