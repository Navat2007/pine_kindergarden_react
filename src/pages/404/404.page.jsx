import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

import styles from "./404.page.module.scss";
import { AdminIcons } from "../../components/svgs";

const Page404 = () => {
    return (
        <>
            <Helmet>
                <title>Страница не найдена</title>
            </Helmet>
            <div className={styles.error_page}>
                <h1 className={styles.title}>
                    <span className={styles.span_accent}>Ошибка 404!</span>
                    Страница не найдена.
                </h1>
                <div className={styles.circle + ` ` + styles.circle_big}></div>
                <div className={styles.circle + ` ` + styles.circle_big_two}></div>
                <div className={styles.circle + ` ` + styles.circle_first}></div>
                <div className={styles.circle + ` ` + styles.circle_second}></div>
                <div className={styles.circle + ` ` + styles.circle_third}></div>
                <div className={styles.circle + ` ` + styles.circle_fourth}></div>
                <div className={styles.circle + ` ` + styles.circle_five}></div>
                <div className={styles.circle + ` ` + styles.circle_six}></div>
                <p className={styles.text}>
                    К сожалению, запрашиваемая Вами страница, не найдена.
                    <br />
                    Повторите попытку позже.
                    <br />
                    <br />
                    <NavLink to={"/"}>Вернуться на главную {AdminIcons.open_in_new}</NavLink>
                </p>
            </div>
        </>
    );
};

export default Page404;
