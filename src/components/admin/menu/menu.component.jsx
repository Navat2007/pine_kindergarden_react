import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../public/logo/logo";
import Button from "../button/button";

import "./menu.scss";
import { AdminIcons } from "../../svgs.js";

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
                setMenuSizeClass("admin-menu_size_md");
                document.documentElement.style.setProperty("--menu-width", "7.5em");
                break;
            case "small":
                setMenuSizeClass("admin-menu_size_sm");
                document.documentElement.style.setProperty("--menu-width", "4.25em");
                break;
            default:
                setMenuSizeClass("");
                document.documentElement.style.setProperty("--menu-width", "15em");
        }
    }, [menuSize]);

    React.useEffect(() => {
        const menuSizeStorage = localStorage.getItem("menuSize");

        if (menuSizeStorage) setMenuSize(menuSizeStorage);
    }, []);

    return (
        <>
            <menu className={`admin-menu ${burgerOpened && "admin-menu_opened"} ${menuSizeClass}`}>
                <div className='admin-menu__inner'>
                    <Logo place={"admin-menu"} />
                    <nav className='admin-menu__nav'>
                        <ul className='admin-menu__list'>
                            {menu.map((item) => (
                                <li className='admin-menu__item' key={item.title}>
                                    <NavLink
                                        to={item.link}
                                        className={({ isActive }) =>
                                            isActive ? `admin-menu__link admin-menu__link_active` : `admin-menu__link`
                                        }
                                        aria-label={item.title}
                                    >
                                        <span className='admin-menu__link-icon'>{item.icon}</span>
                                        <p className='admin-menu__link-text'>{item.title}</p>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Button
                        type='button'
                        iconName={AdminIcons.chevron_down}
                        extraClass='admin-menu__button'
                        aria-label='Свернуть/Развернуть меню'
                        onClick={handleResize}
                    />
                    <div className='admin-menu__back' onClick={setBurgerOpened} />
                </div>
            </menu>
        </>
    );
};

export default Menu;
