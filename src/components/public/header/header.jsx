import React from "react";
import Logo from "../logo/logo";
import useOnClickOutside from "../../../hook/onClickOutside";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminIcons } from "../../svgs";

import "./header.scss";
import "./menu.scss";
import "./submenu.scss";

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
                <nav className={`menu${burgerOpened ? " menu_opened" : ""}`}>
                    <Logo extraClass={"header__logo header__logo_place_menu"} />
                    <div ref={node} className='menu__inner'>
                        <ul className={`menu__list`}>
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) =>
                                        isActive ? `menu__link menu__link_active` : `menu__link`
                                    }
                                >
                                    Главная
                                </NavLink>
                            </li>
                            <li>
                                <div className='submenu'>
                                    <div className='menu__link submenu__caption'>
                                        <p className='submenu__caption-text'>Сведения об образовательной организации</p>
                                        <button
                                            className='submenu__button'
                                            type='button'
                                            aria-label='Развернуть список'
                                        >
                                            <span className='submenu__button-icon'>{AdminIcons.chevron_down}</span>
                                        </button>
                                    </div>
                                    <div className='submenu__container'>
                                        <ul className='submenu__list'>
                                            <li>
                                                <NavLink
                                                    to={"/lessons/"}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `submenu__link submenu__link_active`
                                                            : `submenu__link`
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
                                                            ? `submenu__link submenu__link_active`
                                                            : `submenu__link`
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
                                                            ? `submenu__link submenu__link_active`
                                                            : `submenu__link`
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
                                        isActive ? `menu__link menu__link_active` : `menu__link`
                                    }
                                >
                                    Питание
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/mode/"}
                                    className={({ isActive }) =>
                                        isActive ? `menu__link menu__link_active` : `menu__link`
                                    }
                                >
                                    Режим
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/about/"}
                                    className={({ isActive }) =>
                                        isActive ? `menu__link menu__link_active` : `menu__link`
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
                    className={`header__burger${burgerOpened ? " header__burger_opened" : ""}`}
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
