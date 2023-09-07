import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

import "./login.scss";
import Logo from "../../components/public/logo/logo";
import FieldEmail from "../../components/admin/field/field.email";
import FieldPassword from "../../components/admin/field/field.password";
import Button from "../../components/admin/button/button";

const LoginPage = () => {
    const { login, loading, error, errorText } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await login(data);
        //navigate("/", { replace: true });
    };

    return (
        <>
            <main className='auth-form'>
                <form className='auth-form__form' action='' name='signin'>
                    <Logo place={`auth-form`} />
                    <h1 className='auth-form__title'>Рады видеть!</h1>
                    <FieldEmail />
                    <FieldPassword />
                    <div className='auth-form__footer'>
                        <Button text={"Войти"} />
                        <p className='auth-form__info-text'>
                            Забыли пароль? <a href=''>Восстановить</a>
                        </p>
                    </div>
                </form>
            </main>

            {/* <Popup opened={true} title={"Окно входа"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldInput
                        placeholder={"Введите логин..."}
                        {...register("login", {
                            required: "Поле обязательно к заполнению",
                        })}
                        defaultValue={
                            window.localStorage.getItem("remember") && window.localStorage.getItem("login")
                                ? window.localStorage.getItem("login")
                                : ""
                        }
                        errorText={errors?.login?.message}
                    />
                    <FieldInput
                        type={"password"}
                        placeholder={"Введите пароль..."}
                        {...register("password", {
                            required: "Поле обязательно к заполнению",
                        })}
                        defaultValue={
                            window.localStorage.getItem("remember") && window.localStorage.getItem("pwd")
                                ? window.localStorage.getItem("pwd")
                                : ""
                        }
                        errorText={errors?.password?.message}
                    />
                    <FieldInput
                        type={"checkbox"}
                        label={"Запомнить логин и пароль?"}
                        {...register("remember")}
                        defaultChecked={window.localStorage.getItem("remember")}
                    />
                    <p className={`${styles.info} ${error ? styles.info_actived : ""}`}>{errorText}</p>
                    <Button
                        type='submit'
                        text={"Войти"}
                        disabled={loading === "loading"}
                        spinnerActive={loading === "loading"}
                    />
                    {/*<div className={styles.navigation}>*/}
            {/*    <Link className={styles.link}>Забыли пароль?</Link>*/}
            {/*    <Link className={styles.link}>Помощь</Link>*/}
            {/*</div>*/}
            {/* </form>
            </Popup>  */}
        </>
    );
};

export default LoginPage;
