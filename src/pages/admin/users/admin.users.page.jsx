import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";

import Button from "../../../components/button/button.component";
import FieldInput from "../../../components/field/field.input.component";
import Notif from "../../../components/notif/notif.component";

import no_photo_man from "../../../images/no_photo_man.png";
import commonStyles from "../../common.module.scss";

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
    const {
        admin,
        loadAdmin,
        addAdmin,
        editAdmin,
        removeAdmin,
        loading,
        sending,
        error,
        errorText,
        clearErrorText,
    } = useUsersStore();

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

    if (id && (admin === null || admin.role === "Пользователь"))
        return <p>Данного администратора не существует</p>;

    if (id && admin)
        return (
            <>
                <div className={commonStyles.title_block}>
                    <Button
                        type="button"
                        theme="text"
                        size="small"
                        isIconBtn={true}
                        iconClass="mdi mdi-arrow-left"
                        aria-label="Назад"
                        onClick={() => back()}
                    />
                    <h1 className={commonStyles.title}>
                        Редактирование администратора ID: {id}
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onEditSubmit)}
                    className="form"
                >
                    <div className="form__container --view-two-columns">
                        <fieldset className="form__section">
                            <h2 className="form__title">Основная информация</h2>
                            {/* Фото педагога - новый блок со сменой фото */}
                            <div className="form__multy-block">
                                <p className="form__label">Фото</p>
                                <div className="form__profile-img-block">
                                    <img
                                        className="form__profile-img"
                                        src={
                                            admin.photo
                                                ? window.global.baseUrl +
                                                  admin.photo
                                                : no_photo_man
                                        }
                                        alt={
                                            admin.photo
                                                ? admin.photo
                                                : "Нет фото"
                                        }
                                    />
                                    <div className="form__profile-img-panel">
                                        <Button
                                            size={"smaller"}
                                            theme={"text"}
                                            isIconBtn={"true"}
                                            iconClass={"mdi mdi-refresh"}
                                            aria-label={"Обновить фото"}
                                            title={"Обновить фото"}
                                        />
                                        <Button
                                            size={"smaller"}
                                            theme={"text"}
                                            isIconBtn={"true"}
                                            iconClass={"mdi mdi-close"}
                                            aria-label={"Удалить фото"}
                                            title={"Удалить фото"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <FieldInput
                                label={"Логин"}
                                placeholder={"Введите логин..."}
                                layout="flex"
                                {...register("login", {
                                    value: admin.login,
                                })}
                            />
                            <FieldInput
                                label={"Email"}
                                placeholder={"Введите email..."}
                                layout="flex"
                                required={true}
                                {...register("email", {
                                    value: admin.email,
                                })}
                            />
                            <FieldInput
                                label={"ФИО"}
                                placeholder={"Введите фио..."}
                                layout="flex"
                                required={true}
                                {...register("fio", { value: admin.fio })}
                            />
                            <FieldInput
                                label={"Контактный телефон"}
                                type={"phone"}
                                placeholder={"Введите контактный телефон..."}
                                layout="flex"
                                required={true}
                                {...register("phone", {
                                    value: admin.phone,
                                })}
                            />
                            <FieldInput
                                label={"Наименование организации"}
                                placeholder={
                                    "Введите наименование организации..."
                                }
                                layout="flex"
                                required={true}
                                {...register("org_name", {
                                    value: admin.org_name,
                                })}
                            />
                            <FieldInput
                                label={"Должность"}
                                placeholder={"Введите должность..."}
                                layout="flex"
                                required={true}
                                {...register("position", {
                                    value: admin.position,
                                })}
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">Безопасность</h2>
                            <FieldInput
                                label={"Пароль"}
                                type={"password"}
                                placeholder={"Введите новый пароль..."}
                                layout="flex"
                                autoComplete={"new-password"}
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Минимальная длина пароля 6 символов",
                                    },
                                })}
                                errorText={
                                    errors?.password && errors.password.message
                                }
                            />
                            <FieldInput
                                label={"Активировать учетную запись?"}
                                type={"checkbox_variant"}
                                {...register("active", {
                                    value: admin.active === "Активен",
                                })}
                            />
                        </fieldset>
                        <fieldset className="form__section">
                            <h2 className="form__title">Права доступа</h2>
                            <FieldInput
                                id={"id_1"}
                                label={"Главный администратор"}
                                type={"checkbox_variant"}
                                {...register("superadmin", {
                                    value:
                                        admin.role === "Главный администратор",
                                    onChange: (e) => {
                                        if (e.target.checked) {
                                            setValue("admin", false);
                                        }
                                    },
                                })}
                            />
                            <FieldInput
                                id={"id_2"}
                                label={"Администратор"}
                                type={"checkbox_variant"}
                                {...register("admin", {
                                    value: admin.role === "Администратор",
                                    onChange: (e) => {
                                        if (e.target.checked) {
                                            setValue("superadmin", false);
                                        }
                                    },
                                })}
                            />
                        </fieldset>
                    </div>
                    <div className="form__controls">
                        <Button
                            type="submit"
                            text={"Сохранить"}
                            spinnerActive={sending.admins}
                        />
                        <Button
                            type="button"
                            iconClass={"mdi mdi-delete"}
                            theme="text"
                            extraClass={`${sending.admins ? "--hide" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setPopupOpened(true);
                            }}
                            text="Удалить"
                        />
                    </div>
                </form>
                <Notif
                    text={"Вы уверены что хотите удалить?"}
                    opened={popupOpened}
                    onClose={() => setPopupOpened(false)}
                    buttons={
                        <>
                            <Button
                                type="button"
                                text={"Нет"}
                                size="small"
                                theme="text"
                                onClick={() => setPopupOpened(false)}
                            />
                            <Button
                                type="button"
                                text={"Да"}
                                size="small"
                                theme={"info"}
                                onClick={() => {
                                    setPopupOpened(false);
                                    onDeleteSubmit();
                                }}
                            />
                        </>
                    }
                />
                <Notif
                    title={"Ошибка!"}
                    state="error"
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
            <div className={commonStyles.title_block}>
                <Button
                    type="button"
                    theme="text"
                    size="small"
                    isIconBtn={true}
                    iconClass="mdi mdi-arrow-left"
                    aria-label="Назад"
                    onClick={() => back()}
                />
                <h1 className={commonStyles.title}>Создание администратора</h1>
            </div>
            <form
                onSubmit={handleSubmit(onAddSubmit)}
                className="form"
            >
                <div className="form__container --view-two-columns">
                    <fieldset className="form__section">
                        <h2 className="form__title">Основная информация</h2>
                        <FieldInput
                            label={"Логин"}
                            placeholder={"Введите логин..."}
                            layout="flex"
                            required={true}
                            {...register("login")}
                        />
                        <FieldInput
                            label={"Email"}
                            placeholder={"Введите email..."}
                            layout="flex"
                            required={true}
                            {...register("email")}
                        />
                        <FieldInput
                            label={"ФИО"}
                            placeholder={"Введите фио..."}
                            layout="flex"
                            required={true}
                            {...register("fio")}
                        />
                        <FieldInput
                            label={"Контактный телефон"}
                            type={"phone"}
                            placeholder={"Введите контактный телефон..."}
                            layout="flex"
                            required={true}
                            {...register("phone")}
                        />
                        <FieldInput
                            label={"Наименование организации"}
                            placeholder={"Введите наименование организации..."}
                            layout="flex"
                            required={true}
                            {...register("org_name")}
                        />
                    </fieldset>
                    <fieldset className="form__section">
                        <h2 className="form__title">Безопасность</h2>
                        <FieldInput
                            label={"Пароль"}
                            type={"password"}
                            placeholder={"Введите пароль..."}
                            layout="flex"
                            autoComplete={"new-password"}
                            required={true}
                            {...register("password", {
                                minLength: {
                                    value: 6,
                                    message:
                                        "Минимальная длина пароля 6 символов",
                                },
                            })}
                            errorText={
                                errors?.password && errors.password.message
                            }
                        />
                        <FieldInput
                            label={"Активировать учетную запись?"}
                            type={"checkbox_variant"}
                            {...register("active", { value: true })}
                        />
                    </fieldset>
                    <fieldset className="form__section">
                        <h2 className="form__title">Права доступа</h2>
                        <FieldInput
                            id={"id_1"}
                            label={"Главный администратор"}
                            type={"checkbox_variant"}
                            {...register("superadmin", {
                                value: true,
                                onChange: (e) => {
                                    if (e.target.checked) {
                                        setValue("admin", false);
                                    }
                                },
                            })}
                        />
                        <FieldInput
                            id={"id_2"}
                            label={"Администратор"}
                            type={"checkbox_variant"}
                            {...register("admin", {
                                onChange: (e) => {
                                    if (e.target.checked) {
                                        setValue("superadmin", false);
                                    }
                                },
                            })}
                        />
                    </fieldset>
                </div>
                <div className="form__controls">
                    <Button
                        type="submit"
                        text={"Создать"}
                        spinnerActive={sending.admins}
                    />
                </div>
            </form>
            <Notif
                title={"Ошибка!"}
                state="error"
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
