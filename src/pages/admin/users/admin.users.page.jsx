import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";

import Button from "../../../components/admin/button/button.component";
import FieldInput from "../../../components/general/field/field.input.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";

import no_photo_man from "../../../images/no_photo_man.png";
import { AdminIcons } from "../../../components/svgs";

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
                            <FieldInput
                                label={"Email"}
                                placeholder={"Введите email..."}
                                layout='flex'
                                required={true}
                                {...register("email", {
                                    value: admin.email,
                                })}
                            />
                            <FieldInput
                                label={"ФИО"}
                                placeholder={"Введите фио..."}
                                layout='flex'
                                required={true}
                                {...register("fio", { value: admin.fio })}
                            />
                            <FieldInput
                                label={"Контактный телефон"}
                                type={"phone"}
                                placeholder={"Введите контактный телефон..."}
                                layout='flex'
                                required={true}
                                {...register("phone", {
                                    value: admin.phone,
                                })}
                            />
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Безопасность</h2>
                            <FieldInput
                                label={"Пароль"}
                                type={"password"}
                                placeholder={"Введите новый пароль..."}
                                layout='flex'
                                autoComplete={"new-password"}
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message: "Минимальная длина пароля 6 символов",
                                    },
                                })}
                                errorText={errors?.password && errors.password.message}
                            />
                            <FieldInput
                                label={"Активировать учетную запись?"}
                                type={"checkbox_variant"}
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
                        <FieldInput
                            label={"Email"}
                            placeholder={"Введите email..."}
                            layout='flex'
                            required={true}
                            {...register("email")}
                        />
                        <FieldInput
                            label={"ФИО"}
                            placeholder={"Введите фио..."}
                            layout='flex'
                            required={true}
                            {...register("fio")}
                        />
                        <FieldInput
                            label={"Контактный телефон"}
                            type={"phone"}
                            placeholder={"Введите контактный телефон..."}
                            layout='flex'
                            required={true}
                            {...register("phone")}
                        />
                    </fieldset>
                    <fieldset className='form__section'>
                        <h2 className='form__title'>Безопасность</h2>
                        <FieldInput
                            label={"Пароль"}
                            type={"password"}
                            placeholder={"Введите пароль..."}
                            layout='flex'
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
                        <FieldInput
                            label={"Активировать учетную запись?"}
                            type={"checkbox_variant"}
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
