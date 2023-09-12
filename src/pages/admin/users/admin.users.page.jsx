import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";

import Button from "../../../components/admin/button/button.component";
import FieldEmail from "../../../components/admin/field/field.email.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldPhone from "../../../components/admin/field/field.phone.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";

import no_photo_man from "../../../images/no_photo_man.png";
import { AdminIcons } from "../../../components/svgs";
import FieldPassword from "../../../components/admin/field/field.password.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";



const AdminUsersPage = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { admin, loadAdmin, addAdmin, editAdmin, removeAdmin, loading, sending, error, errorText, clearErrorText } =
        useUsersStore();

    const [popupOpened, setPopupOpened] = React.useState(false);
    const [popupErrorOpened, setPopupErrorOpened] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            reset();
            loadAdmin({ id });
        }
    }, [id]);

    React.useEffect(() => {
        if (error.admins) setPopupErrorOpened(true);
    }, [error.admins]);

    const back = () => navigate("/admin/users");

    const onAddSubmit = async (params) => {
        const result = await addAdmin(params);

        if (!result.error) back();
    };

    const onEditSubmit = async (params) => {
        params.id = id;
        const result = await editAdmin(params);

        if (!result.error) back();
    };

    const onDeleteSubmit = async () => {
        const result = await removeAdmin({ id });

        if (!result.error) back();
    };

    if (loading.admins) return <p>Загрузка...</p>;

    if (id && (admin === null || admin.role === "Пользователь")) return <p>Данного администратора не существует</p>;

    if (id && admin)
        return (
            <>
                <div className='app__title-block'>
                    <Button
                        type='button'
                        theme='text'
                        isIconBtn
                        iconName={AdminIcons.back}
                        aria-label='Назад'
                        onClick={() => back()}
                    />
                    <h1 className='app__title'>Редактирование администратора ID: {id}</h1>
                </div>
                <form onSubmit={handleSubmit(onEditSubmit)} className='form'>
                    <div className='form__container --view-two-columns'>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Основная информация</h2>
                            <FieldEmail
                                placeholder={"Введите email..."}
                                required={true}
                                {...register("email", {
                                    value: admin.email,
                                })}
                            />
                            <FieldText
                                label={"ФИО"}
                                placeholder={"Введите фио..."}
                                required={true}
                                {...register("fio", { value: admin.fio })}
                            />
                            <FieldPhone
                                label={"Контактный телефон"}
                                placeholder={"Введите контактный телефон..."}
                                required={true}
                                {...register("phone", {
                                    value: admin.phone,
                                })}
                            />
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Безопасность</h2>
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
                                    value: admin.active === "Активен",
                                })}
                            />
                        </fieldset>
                    </div>
                    <div className='form__controls'>
                        <Button type='submit' text={"Сохранить"} spinnerActive={sending.admins} />
                        <Button
                            type='button'
                            iconClass={"mdi mdi-delete"}
                            theme='text'
                            extraClass={`${sending.admins ? "--hide" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setPopupOpened(true);
                            }}
                            text='Удалить'
                        />
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
                                text={"Нет"}
                                size='small'
                                theme='text'
                                onClick={() => setPopupOpened(false)}
                            />
                            <Button
                                type='button'
                                text={"Да"}
                                size='small'
                                theme={"info"}
                                onClick={() => {
                                    setPopupOpened(false);
                                    onDeleteSubmit();
                                }}
                            />
                        </>
                    }
                />
                <AlertPopup
                    title={"Ошибка!"}
                    state='error'
                    text={errorText.admins}
                    opened={popupErrorOpened}
                    onClose={() => {
                        clearErrorText();
                        setPopupErrorOpened(false);
                    }}
                />
            </>
        );

    return (
        <>
            <div className='app__title-block'>
                <Button
                    type='button'
                    theme='text'
                    isIconBtn
                    iconName={AdminIcons.back}
                    aria-label='Назад'
                    onClick={() => back()}
                />
                <h1 className='app__title'>Создание администратора</h1>
            </div>
            <form onSubmit={handleSubmit(onAddSubmit)} className='form'>
                <div className='form__container --view-two-columns'>
                    <fieldset className='form__section'>
                        <h2 className='form__title'>Основная информация</h2>
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
                    <fieldset className='form__section'>
                        <h2 className='form__title'>Безопасность</h2>
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
                            {...register("active", { value: true })}
                        />
                    </fieldset>
                </div>
                <div className='form__controls'>
                    <Button type='submit' spinnerActive={sending.admins}>
                        Создать
                    </Button>
                </div>
            </form>
            <AlertPopup
                title={"Ошибка!"}
                state='error'
                text={errorText.admins}
                opened={popupErrorOpened}
                onClose={() => {
                    clearErrorText();
                    setPopupErrorOpened(false);
                }}
            />
        </>
    );
};

export default AdminUsersPage;
