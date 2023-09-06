import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../button/button.component";
import logo from "../../../images/logo.png";
import styles from "./header.module.scss";

const HeaderComponent = ({ children, handleBurger }) => {
    return (
        <header className={styles.header}>
            <NavLink
                to={"/"}
                className={styles.logo}
            >
                <img
                    src={logo}
                    alt="Маски"
                />
            </NavLink>
            <Button
                type="button"
                theme="text"
                isIconBtn={true}
                iconClass="mdi mdi-menu"
                extraClass={styles.burger}
                aria-label="Открыть/Закрыть меню"
                onClick={handleBurger}
            />
            {children}
        </header>
    );
};

export default HeaderComponent;
