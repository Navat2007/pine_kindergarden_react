import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./404.page.module.scss";
import commonStyles from "./common.module.scss";

const Page404 = () => {
    React.useEffect(() => {
        document.title = "404";
    }, []);

    return (
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
                <NavLink
                    className={commonStyles.link}
                    to={"/"}
                >
                    Вернуться на главную{" "}
                    <span className="mdi mdi-open-in-new"></span>
                </NavLink>
            </p>
        </div>
    );
};

export default Page404;
