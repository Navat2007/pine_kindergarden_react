import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";

import useAuthStore from "../../store/authStore";

import Logo from "../../components/public/logo/logo";
import Button from "../../components/admin/button/button";
import FieldEmail from "../../components/admin/field/field.email";
import FieldPassword from "../../components/admin/field/field.password";

import "./login.scss";

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
    };

    return (
        <>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <main className='auth-form'>
                <form className='auth-form__form' onSubmit={handleSubmit(onSubmit)}>
                    <Logo place={`auth-form`} />
                    <h1 className='auth-form__title'>Рады видеть!</h1>
                    <FieldEmail
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
                    <FieldPassword
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
                    <div className='auth-form__footer'>
                        <Button text={"Войти"} disabled={loading === "loading"} spinnerActive={loading === "loading"} />
                    </div>
                </form>
            </main>
        </>
    );
};

export default LoginPage;
