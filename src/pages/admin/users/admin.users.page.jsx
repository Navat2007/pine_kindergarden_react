import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useUsersStore from "../../../store/admin/usersStore";

import TitleBlock from "../../../components/admin/title.block/title.block.component";
import Button from "../../../components/admin/button/button.component";
import FieldEmail from "../../../components/admin/field/field.email.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldPhone from "../../../components/admin/field/field.phone.component";
import FieldPassword from "../../../components/admin/field/field.password.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";

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
        console.log(id);
        console.log(admin);
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
            return <TitleBlock title={`Загрузка...`} />;
        }
    };

    const NotFound = () => {
        if (loading.admins === false && id && (admin === null || admin.role === "Пользователь")) {
            return <TitleBlock title={`Данного администратора не существует`} onBack={back} />;
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
                                        {...register("active", { value: true })}
                                    />
                                </fieldset>
                            </div>
                            <div className='admin-form__controls'>
                                <Button extraClass={"admin-form__button"} type='submit' spinnerActive={sending.admins}>
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

            if (loading.admins === false && id && admin) {
                return (
                    <>
                        <TitleBlock title={`Редактирование администратора ID: ${id}`} onBack={back} />
                        <form onSubmit={handleSubmit(onEditSubmit)} className='admin-form'>
                            <div className='admin-form__two-columns'>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Основная информация</h2>
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
                                            value: admin.active === "Активен",
                                        })}
                                    />
                                </fieldset>
                            </div>
                            <div className='admin-form__controls'>
                                <Button extraClass={"admin-form__button"} type='submit' spinnerActive={sending.admins}>
                                    Сохранить
                                </Button>
                                <Button
                                    type='button'
                                    theme='text'
                                    extraClass={`admin-form__button${sending.admins ? ` --hide` : ``}`}
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
                                    <Button type='button' theme='text' onClick={() => setPopupOpened(false)}>
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
