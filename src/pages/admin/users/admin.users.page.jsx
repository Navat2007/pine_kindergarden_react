import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";

import TitleBlock from "../../../components/admin/title.block.component";
import Button from "../../../components/admin/button/button.component";
import FieldEmail from "../../../components/admin/field/field.email.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldPhone from "../../../components/admin/field/field.phone.component";
import FieldPassword from "../../../components/admin/field/field.password.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";

import { AdminIcons } from "../../../components/svgs";
import commonStyles from "../../common.module.scss";

const AdminUsersPage = () => {
    const navigate = useNavigate();

    let { id } = useParams();
    const {
        register,
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

    //Private component
    const Loading = () => {
        if (loading.admins) {
            return (
                <div className={commonStyles.title_block}>
                    <h1 className={commonStyles.title}>Загрузка...</h1>
                </div>
            );
        }
    };

    const NotFound = () => {
        if (id && (admin === null || admin.role === "Пользователь")) {
            return (
                <div className={commonStyles.title_block}>
                    <Button type='button' iconName={AdminIcons.back} isIconBtn aria-label='Назад' onClick={back} />
                    <h1 className={commonStyles.title}>Данного администратора не существует</h1>
                </div>
            );
        }
    };

    const MainBlock = () => {
        const NewAdmin = () => {
            const onAddSubmit = async (params) => {
                const result = await addAdmin(params);

                if (!result.error) back();
            };

            if (!id) {
                return (
                    <>
                        <TitleBlock title={"Создание администратора"} onBack={back} />
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
            }
        };

        const EditAdmin = () => {
            const onEditSubmit = async (params) => {
                params.id = id;
                const result = await editAdmin(params);

                if (!result.error) back();
            };

            const onDeleteSubmit = async () => {
                const result = await removeAdmin({ id });

                if (!result.error) back();
            };

            if (id && admin) {
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
                                <Button type='submit' spinnerActive={sending.admins}>
                                    Сохранить
                                </Button>
                                <Button
                                    type='button'
                                    iconClass={"mdi mdi-delete"}
                                    theme='text'
                                    extraClass={`${sending.admins ? "--hide" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPopupOpened(true);
                                    }}
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
                                    >
                                        Нет
                                    </Button>
                                    <Button
                                        type='button'
                                        text={"Да"}
                                        size='small'
                                        theme={"info"}
                                        onClick={() => {
                                            setPopupOpened(false);
                                            onDeleteSubmit();
                                        }}
                                    >
                                        Да
                                    </Button>
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
            }
        };

        return (
            <>
                <NewAdmin />
                <EditAdmin />
            </>
        );
    };

    return (
        <>
            <Loading />
            <MainBlock />
            <NotFound />
        </>
    );
};

export default AdminUsersPage;
