import React from "react";
import {NavLink} from "react-router-dom";

import Logo from "../logo/logo";
import useOnClickOutside from "../../../hook/onClickOutside";

import "./menu.scss";

const Menu = ({ place }) => {

    const node = React.useRef();
    const button = React.useRef();

    useOnClickOutside([node, button], (e) => {
        if (burgerOpened) {
            setBurgerOpened(!burgerOpened);
        }
    });

    const [burgerOpened, setBurgerOpened] = React.useState(false);

    return (
        <>
            <nav className={`menu ${place && `menu_place_${place}`}${place === "header" && burgerOpened ? " menu_opened" : ""}`}>
                <div ref={node} className='menu__inner'>
                    <ul className={`menu__list`}>
                        <li>
                            <NavLink
                                to={"/lessons/"}
                                className={({ isActive }) =>
                                    isActive
                                        ? `menu__link menu__link_active`
                                        : `menu__link`
                                }
                                aria-label={"Занятия"}
                            >
                                Занятия
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/documents/"}
                                className={({ isActive }) =>
                                    isActive
                                        ? `menu__link menu__link_active`
                                        : `menu__link`
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
                                        ? `menu__link menu__link_active`
                                        : `menu__link`
                                }
                                aria-label={"Педагоги"}
                            >
                                Педагоги
                            </NavLink>
                        </li>
                    </ul>
                    <Logo place={`${place}-menu`} />
                    <ul className='menu__list'>
                        <li>
                            <NavLink
                                to={"/food/"}
                                className={({ isActive }) =>
                                    isActive
                                        ? `menu__link menu__link_active`
                                        : `menu__link`
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
                                    isActive
                                        ? `menu__link menu__link_active`
                                        : `menu__link`
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
                                    isActive
                                        ? `menu__link menu__link_active`
                                        : `menu__link`
                                }
                                aria-label={"О нас"}
                            >
                                О&nbsp;нас
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            {
                place === "header" &&
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
            }
        </>
    );
};

export default Menu;
