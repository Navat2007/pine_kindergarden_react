import React from "react";
import "./menu.scss";
import Logo from "../logo/logo";

const Menu = ({ place }) => {
    return (
        <nav className={`menu ${place && `menu_place_${place}`}`}>
            <div className='menu__inner'>
                <ul className='menu__list'>
                    <li>
                        <a className='menu__link' href='./lessons.html' rel='noopener'>
                            Занятия
                        </a>
                    </li>
                    <li>
                        <a className='menu__link' href='./documents.html' rel='noopener'>
                            Документы
                        </a>
                    </li>
                    <li>
                        <a className='menu__link' href='#0' rel='noopener'>
                            Педагоги
                        </a>
                    </li>
                </ul>
                <Logo place={`${place}-menu`} />
                <ul className='menu__list'>
                    <li>
                        <a className='menu__link' href='./food.html' rel='noopener'>
                            Питание
                        </a>
                    </li>
                    <li>
                        <a className='menu__link' href='#0' rel='noopener'>
                            Режим
                        </a>
                    </li>
                    <li>
                        <a className='menu__link' href='./about.html' rel='noopener'>
                            О&nbsp;нас
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
