import React from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import {Login, Loading, Error} from "../../services/user";

import Logo from "../../components/public/logo/logo";
import Button from "../../components/admin/button/button.component";
import FieldEmail from "../../components/admin/field/field.email.component";
import FieldPassword from "../../components/admin/field/field.password.component";
import FieldCheckbox from "../../components/admin/field/field.checkbox.component";

import "./login.scss";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await Login(data);
    };

    return (
        <>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <motion.main
                className='auth-form'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <form className='auth-form__form' onSubmit={handleSubmit(onSubmit)}>
                    <Logo extraClass={`auth-form__logo`} />
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
                    <br />
                    <FieldCheckbox
                        type={"checkbox"}
                        label={"Запомнить логин и пароль?"}
                        {...register("remember")}
                        defaultChecked={window.localStorage.getItem("remember")}
                    />
                    <div className='auth-form__footer'>
                        <p className='auth-form__error'>{Error.value}</p>
                        <Button
                            extraClass={"auth-form__button"}
                            disabled={Loading.value === "loading"}
                            spinnerActive={Loading.value === "loading"}
                        >
                            Войти
                        </Button>
                    </div>
                </form>
            </motion.main>
        </>
    );
};

export default LoginPage;
