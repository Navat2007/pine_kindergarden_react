import React from "react";
import Logo from "../logo/logo";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    const node = React.useRef();

    return (
        <motion.footer
            className='footer'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <div className='footer__inner'>
                <div className='footer__columns'>
                    <div className='footer__column footer__column_content_logo'>
                        <Logo extraClass='footer__logo' />
                    </div>
                    <nav className='footer__column footer__column_content_menu footer__menu'>
                        <ul className='footer__menu-list'>
                            <li>
                                <div className='footer__sub-menu'>
                                    <p className='footer__menu-link footer__sub-menu-caption'>
                                        Сведения об образовательной организации
                                    </p>
                                    <ul className='footer__sub-menu-list'>
                                        <li>
                                            <NavLink
                                                to={"/lessons/"}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? `footer__sub-menu-link footer__sub-menu-link_active`
                                                        : `footer__sub-menu-link`
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
                                                        ? `footer__sub-menu-link footer__sub-menu-link_active`
                                                        : `footer__sub-menu-link`
                                                }
                                                aria-label={"Платные услуги"}
                                            >
                                                Документы
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/employees/"}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? `footer__sub-menu-link footer__sub-menu-link_active`
                                                        : `footer__sub-menu-link`
                                                }
                                                aria-label={"Платные услуги"}
                                            >
                                                Педагоги
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <NavLink
                                    to={"/food/"}
                                    className={({ isActive }) =>
                                        isActive ? `footer__menu-link footer__menu-link_active` : `footer__menu-link`
                                    }
                                    aria-label={"Питание"}
                                >
                                    Питание
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/mode/"}
                                    className={({ isActive }) =>
                                        isActive ? `footer__menu-link footer__menu-link_active` : `footer__menu-link`
                                    }
                                    aria-label={"Режим"}
                                >
                                    Режим
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/about/"}
                                    className={({ isActive }) =>
                                        isActive ? `footer__menu-link footer__menu-link_active` : `footer__menu-link`
                                    }
                                    aria-label={"О нас"}
                                >
                                    О&nbsp;нас
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='footer__content'>
                    <p className='footer__author'>
                        ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo; Все права
                        защищены
                    </p>
                    <NavLink to={"/login"} className={"footer__lk-link main-link"}>
                        Личный кабинет &rarr;
                    </NavLink>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
