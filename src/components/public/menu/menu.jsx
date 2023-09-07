import React from "react";
import {NavLink} from "react-router-dom";

import Logo from "../logo/logo";

import "./menu.scss";

const Menu = ({ place }) => {
    return (
        <nav className={`menu ${place && `menu_place_${place}`}`}>
            <div className='menu__inner'>
                <ul className='menu__list'>
                    <li>
                        <NavLink
                            to={"/lessons/"}
                            className={"menu__link"}
                            aria-label={"Занятия"}
                        >
                            Занятия
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/documents/"}
                            className={"menu__link"}
                            aria-label={"Документы"}
                        >
                            Документы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/teachers/"}
                            className={"menu__link"}
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
                            className={"menu__link"}
                            aria-label={"Питание"}
                        >
                            Питание
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/mode/"}
                            className={"menu__link"}
                            aria-label={"Режим"}
                        >
                            Режим
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/about/"}
                            className={"menu__link"}
                            aria-label={"О нас"}
                        >
                            О&nbsp;нас
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
