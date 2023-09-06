import React from "react";

import { NavLink } from "react-router-dom";

import logo from "../../../images/logo.png";
import Button from "../button/button.component";

import styles from "./menu.module.scss";

const Menu = ({ menu, burgerOpened, setBurgerOpened }) => {
    const [menuSize, setMenuSize] = React.useState("");
    const [menuSizeClass, setMenuSizeClass] = React.useState("");

    const handleResize = () => {
        switch (menuSize) {
            case "normal":
                setMenuSize("medium");
                localStorage.setItem("menuSize", "medium");
                break;
            case "medium":
                setMenuSize("small");
                localStorage.setItem("menuSize", "small");
                break;
            default:
                setMenuSize("normal");
                localStorage.setItem("menuSize", "normal");
        }
    };

    React.useEffect(() => {
        switch (menuSize) {
            case "medium":
                setMenuSizeClass(styles.menu_size_md);
                document.documentElement.style.setProperty(
                    "--menu-width",
                    "7.5em"
                );
                break;
            case "small":
                setMenuSizeClass(styles.menu_size_sm);
                document.documentElement.style.setProperty(
                    "--menu-width",
                    "4.25em"
                );
                break;
            default:
                setMenuSizeClass("");
                document.documentElement.style.setProperty(
                    "--menu-width",
                    "15em"
                );
        }
    }, [menuSize]);

    React.useEffect(() => {
        const menuSizeStorage = localStorage.getItem("menuSize");

        if (menuSizeStorage) setMenuSize(menuSizeStorage);
    }, []);

    return (
        <menu
            className={
                styles.menu +
                ` ${burgerOpened ? styles.menu_opened : ""} ${menuSizeClass}`
            }
        >
            <div className={styles.container}>
                <img
                    className={styles.logo}
                    src={logo}
                    alt="Содружество Школьных театров города Москвы"
                />
                <ul className={styles.list}>
                    {menu.map((item) => (
                        <li key={item.title}>
                            <NavLink
                                to={item.link}
                                className={({ isActive }) =>
                                    isActive
                                        ? styles.link +
                                          ` ` +
                                          styles.link_actived
                                        : styles.link
                                }
                                aria-label={item.title}
                            >
                                <span className={styles.icon}>{item.icon}</span>
                                <p className={styles.text}>{item.title}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <Button
                    type="button"
                    isIconBtn="true"
                    iconClass="mdi mdi-chevron-left"
                    extraClass={styles.button}
                    aria-label="Свернуть/Развернуть меню"
                    onClick={handleResize}
                />
            </div>
            <div
                className={styles.back}
                onClick={setBurgerOpened}
            />
        </menu>
    );
};

export default Menu;
