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
                    <ul className={`menu__list`}>
                        <li className='menu__item'>
                            <NavLink
                                to={"/"}
                                className={({ isActive }) => (isActive ? `menu__link menu__link_active` : `menu__link`)}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li className='submenu__item'>
                            <NavLink
                                to={"/lessons/"}
                                className={({ isActive }) =>
                                    isActive ? `submenu__link submenu__link_active` : `submenu__link`
                                }
                                aria-label={"Платные услуги"}
                            >
                                Платные услуги
                            </NavLink>
                        </li>
                        <li className='submenu__item'>
                            <NavLink
                                to={"/documents/"}
                                className={({ isActive }) =>
                                    isActive ? `submenu__link submenu__link_active` : `submenu__link`
                                }
                                aria-label={"Документы"}
                            >
                                Документы
                            </NavLink>
                        </li>
                        <li className='submenu__item'>
                            <NavLink
                                to={"/employees/"}
                                className={({ isActive }) =>
                                    isActive ? `submenu__link submenu__link_active` : `submenu__link`
                                }
                                aria-label={"Педагоги"}
                            >
                                Педагоги
                            </NavLink>
                        </li>
                        {/* Это выпадающее меню (в мобильной версии, просто будет сдвиг влево) */}
                        {/*<li className='menu__item menu__item_has-submenu submenu'>*/}
                        {/*    <button className='submenu__button' type='button' aria-label='Развернуть список'>*/}
                        {/*        <span className='submenu__button-text'>Сведения об образовательной организации</span>*/}
                        {/*        <span className='submenu__button-icon'>{AdminIcons.chevron_down}</span>*/}
                        {/*    </button>*/}
                        {/*    <ul className='submenu__list'>*/}
                        {/*        <li className='submenu__item'>*/}
                        {/*            <NavLink*/}
                        {/*                to={"/lessons/"}*/}
                        {/*                className={({ isActive }) =>*/}
                        {/*                    isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                }*/}
                        {/*                aria-label={"Платные услуги"}*/}
                        {/*            >*/}
                        {/*                Платные услуги*/}
                        {/*            </NavLink>*/}
                        {/*        </li>*/}
                        {/*        <li className='submenu__item'>*/}
                        {/*            <NavLink*/}
                        {/*                to={"/documents/"}*/}
                        {/*                className={({ isActive }) =>*/}
                        {/*                    isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                }*/}
                        {/*                aria-label={"Документы"}*/}
                        {/*            >*/}
                        {/*                Документы*/}
                        {/*            </NavLink>*/}
                        {/*        </li>*/}
                        {/*        /!* Это еще один выпадающий список, классы submenu_inset_right - это с какой стороны будет появлятся окошко, есть левая сторона, можно как-нить к скрипту подтянуть, чтобы не врезался за край экрана. Также по идее если выставлять правильно сторону появления окна, то можно вкладывать много уровней меню. *!/*/}
                        {/*        <li className='submenu__item submenu__item_has-submenu submenu submenu_inset_right'>*/}
                        {/*            <button className='submenu__button' type='button' aria-label='Развернуть список'>*/}
                        {/*                <span className='submenu__button-text'>*/}
                        {/*                    Сведения об образовательной организации*/}
                        {/*                </span>*/}
                        {/*                <span className='submenu__button-icon'>{AdminIcons.chevron_down}</span>*/}
                        {/*            </button>*/}
                        {/*            <ul className='submenu__list'>*/}
                        {/*                <li className='submenu__item'>*/}
                        {/*                    <NavLink*/}
                        {/*                        to={"/lessons/"}*/}
                        {/*                        className={({ isActive }) =>*/}
                        {/*                            isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                        }*/}
                        {/*                        aria-label={"Платные услуги"}*/}
                        {/*                    >*/}
                        {/*                        Платные услуги*/}
                        {/*                    </NavLink>*/}
                        {/*                </li>*/}
                        {/*                <li className='submenu__item'>*/}
                        {/*                    <NavLink*/}
                        {/*                        to={"/documents/"}*/}
                        {/*                        className={({ isActive }) =>*/}
                        {/*                            isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                        }*/}
                        {/*                        aria-label={"Документы"}*/}
                        {/*                    >*/}
                        {/*                        Документы*/}
                        {/*                    </NavLink>*/}
                        {/*                </li>*/}
                        {/*                <li className='submenu__item'>*/}
                        {/*                    <NavLink*/}
                        {/*                        to={"/employees/"}*/}
                        {/*                        className={({ isActive }) =>*/}
                        {/*                            isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                        }*/}
                        {/*                        aria-label={"Педагоги"}*/}
                        {/*                    >*/}
                        {/*                        Педагоги*/}
                        {/*                    </NavLink>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </li>*/}
                        {/*        <li className='submenu__item'>*/}
                        {/*            <NavLink*/}
                        {/*                to={"/employees/"}*/}
                        {/*                className={({ isActive }) =>*/}
                        {/*                    isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                }*/}
                        {/*                aria-label={"Педагоги"}*/}
                        {/*            >*/}
                        {/*                Педагоги*/}
                        {/*            </NavLink>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}
                        <li className='menu__item'>
                            <NavLink
                                to={"/food/"}
                                className={({ isActive }) => (isActive ? `menu__link menu__link_active` : `menu__link`)}
                            >
                                Питание
                            </NavLink>
                        </li>
                        <li className='menu__item'>
                            <NavLink
                                to={"/mode/"}
                                className={({ isActive }) => (isActive ? `menu__link menu__link_active` : `menu__link`)}
                            >
                                Режим
                            </NavLink>
                        </li>
                        <li className='menu__item'>
                            <NavLink
                                to={"/about/"}
                                className={({ isActive }) => (isActive ? `menu__link menu__link_active` : `menu__link`)}
                            >
                                О&nbsp;нас
                            </NavLink>
                        </li>
                        {/* Это Еще меню - в нем нет раскрывающегося списка, но есть прокрутка по высоте, если пунктов слишком много. */}
                        {/*<li className='menu__item menu__item_more-menu submenu'>*/}
                        {/*    <button className='submenu__button' type='button' aria-label='Развернуть список'>*/}
                        {/*        <span className='submenu__button-text'>Еще</span>*/}
                        {/*        <span className='submenu__button-icon'>{AdminIcons.chevron_down}</span>*/}
                        {/*    </button>*/}
                        {/*    <ul className='submenu__list'>*/}
                        {/*        <li className='submenu__item'>*/}
                        {/*            <NavLink*/}
                        {/*                to={"/lessons/"}*/}
                        {/*                className={({ isActive }) =>*/}
                        {/*                    isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                }*/}
                        {/*                aria-label={"Платные услуги"}*/}
                        {/*            >*/}
                        {/*                Платные услуги*/}
                        {/*            </NavLink>*/}
                        {/*        </li>*/}
                        {/*        <li className='submenu__item'>*/}
                        {/*            <NavLink*/}
                        {/*                to={"/documents/"}*/}
                        {/*                className={({ isActive }) =>*/}
                        {/*                    isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                }*/}
                        {/*                aria-label={"Документы"}*/}
                        {/*            >*/}
                        {/*                Документы*/}
                        {/*            </NavLink>*/}
                        {/*        </li>*/}
                        {/*        /!* Здесь если есть подменю, немного структура отличается, т.к. там ракрывать ничего не нужно, нужен только сдвиг влево, поэтому в списке. По идее можно много уровней так делать, будет ок *!/*/}
                        {/*        <li className='submenu__item submenu__item_has_submenu'>*/}
                        {/*            <p className='submenu__caption'>Сведения об образовательной организации</p>*/}
                        {/*            <ul className='submenu__caption-list'>*/}
                        {/*                <li className='submenu__item'>*/}
                        {/*                    <NavLink*/}
                        {/*                        to={"/lessons/"}*/}
                        {/*                        className={({ isActive }) =>*/}
                        {/*                            isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                        }*/}
                        {/*                        aria-label={"Платные услуги"}*/}
                        {/*                    >*/}
                        {/*                        Платные услуги*/}
                        {/*                    </NavLink>*/}
                        {/*                </li>*/}
                        {/*                <li className='submenu__item'>*/}
                        {/*                    <NavLink*/}
                        {/*                        to={"/documents/"}*/}
                        {/*                        className={({ isActive }) =>*/}
                        {/*                            isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                        }*/}
                        {/*                        aria-label={"Документы"}*/}
                        {/*                    >*/}
                        {/*                        Документы*/}
                        {/*                    </NavLink>*/}
                        {/*                </li>*/}
                        {/*                <li className='submenu__item'>*/}
                        {/*                    <NavLink*/}
                        {/*                        to={"/employees/"}*/}
                        {/*                        className={({ isActive }) =>*/}
                        {/*                            isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                        }*/}
                        {/*                        aria-label={"Педагоги"}*/}
                        {/*                    >*/}
                        {/*                        Педагоги*/}
                        {/*                    </NavLink>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </li>*/}
                        {/*        <li className='submenu__item'>*/}
                        {/*            <NavLink*/}
                        {/*                to={"/employees/"}*/}
                        {/*                className={({ isActive }) =>*/}
                        {/*                    isActive ? `submenu__link submenu__link_active` : `submenu__link`*/}
                        {/*                }*/}
                        {/*                aria-label={"Педагоги"}*/}
                        {/*            >*/}
                        {/*                Педагоги*/}
                        {/*            </NavLink>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}
                    </ul>
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
