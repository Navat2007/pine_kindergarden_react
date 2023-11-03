import React from "react";
import Logo from "../logo/logo";
import useOnClickOutside from "../../../hook/onClickOutside";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminIcons } from "../../svgs";

import "./header.scss";

const Header = () => {
    const node = React.useRef();
    const button = React.useRef();
    const location = useLocation();
    const stickyHeader = React.useRef();
    const [burgerOpened, setBurgerOpened] = React.useState(false);

    useOnClickOutside([node, button], (e) => {
        if (burgerOpened) {
            setBurgerOpened(!burgerOpened);
        }
    });

    React.useLayoutEffect(() => {
        setBurgerOpened(false);
    }, [location]);

    React.useLayoutEffect(() => {
        const header = document.querySelector(".header");
        let fixedTop = stickyHeader.current.offsetTop;

        const stickyHeaderEvent = () => {
            if (window.pageYOffset > fixedTop) {
                header.classList.add("header_sticky");
            } else {
                header.classList.remove("header_sticky");
            }
        };
        window.addEventListener("scroll", stickyHeaderEvent);
    }, []);

    return (
        <motion.header
            ref={stickyHeader}
            className='header'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <div className='header__inner'>
                <Logo extraClass={"header__logo"} />
                <nav className={`header__menu${burgerOpened ? " header__menu_opened" : ""}`}>
                    <Logo extraClass={"header__logo header__logo_place_menu"} />
                    <div ref={node} className='header__menu-inner'>
                        <ul className={`header__menu-list`}>
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) =>
                                        isActive ? `header__menu-link header__menu-link_active` : `header__menu-link`
                                    }
                                >
                                    Главная
                                </NavLink>
                            </li>
                            <li>
                                <div className='header__drop-down-menu'>
                                    <div className='header__menu-link header__drop-down-menu-caption'>
                                        <span className='header__drop-down-menu-caption-text'>
                                            Сведения об образовательной организации
                                        </span>
                                        <button
                                            className='header__drop-down-menu-button'
                                            type='button'
                                            aria-label='Развернуть список'
                                        >
                                            <span className='header__drop-down-menu-button-icon'>
                                                {AdminIcons.chevron_down}
                                            </span>
                                        </button>
                                    </div>
                                    <div className='header__drop-down-menu-container'>
                                        <ul className='header__drop-down-menu-list'>
                                            <li>
                                                <NavLink
                                                    to={"/lessons/"}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `header__drop-down-menu-link header__drop-down-menu-link_active`
                                                            : `header__drop-down-menu-link`
                                                    }
                                                    aria-label={"Платные услуги"}
                                                >
                                                    Платные услуги
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to={"/documents/"}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `header__drop-down-menu-link header__drop-down-menu-link_active`
                                                            : `header__drop-down-menu-link`
                                                    }
                                                    aria-label={"Документы"}
                                                >
                                                    Документы
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to={"/teachers/"}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `header__drop-down-menu-link header__drop-down-menu-link_active`
                                                            : `header__drop-down-menu-link`
                                                    }
                                                    aria-label={"Педагоги"}
                                                >
                                                    Педагоги
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <NavLink
                                    to={"/food/"}
                                    className={({ isActive }) =>
                                        isActive ? `header__menu-link header__menu-link_active` : `header__menu-link`
                                    }
                                >
                                    Питание
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/mode/"}
                                    className={({ isActive }) =>
                                        isActive ? `header__menu-link header__menu-link_active` : `header__menu-link`
                                    }
                                >
                                    Режим
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/about/"}
                                    className={({ isActive }) =>
                                        isActive ? `header__menu-link header__menu-link_active` : `header__menu-link`
                                    }
                                >
                                    О&nbsp;нас
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                <button
                    ref={button}
                    type='button'
                    className={`burger${burgerOpened ? " burger_opened" : ""}`}
                    aria-label='Свернуть/Развернуть меню'
                    onClick={(e) => {
                        setBurgerOpened(!burgerOpened);
                    }}
                >
                    <div></div>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
