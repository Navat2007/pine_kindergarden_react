import React from 'react';
import Button from "../button/button.component";

import {AdminIcons} from "../../svgs";

{/* Здесь просится новый компонент - контекстное меню. Сейчас оно открыто и выпадает справа окна, но в будущем можно будет задавать позицию точнее.
                    Появление можешь сделать через моушен. Класс admin-context-menu__wrapper при нажатии на кнопку будет открываться/скрываться.
                    Также у класса admin-context-menu__item если он выбран появляется модификатор admin-context-menu__item_active */}

{/* Конец контекстного меню. Когда вынесешь сообщи, я стили также перенесу. */}
const ContextMenu = () => {
    const [opened, setOpened] = React.useState(false);

    return (
        <nav className='admin-context-menu'>
            <Button
                type='button'
                isIconBtn={true}
                extraClass={"admin-context-menu__menu-button"}
                iconName={AdminIcons.view_list}
            />
            <div className='admin-context-menu__wrapper'>
                <p className='admin-context-menu__title'>Вид</p>
                <ul className='admin-context-menu__list'>
                    <li className='admin-context-menu__item admin-context-menu__item_active'>
                        <p className='admin-context-menu-item admin-context-menu-item_active'>
                                        <span className='admin-context-menu-item__label'>
                                            {AdminIcons.view_list}
                                            Плитка
                                        </span>
                            <span className='admin-context-menu-item__icon'>{AdminIcons.check}</span>
                        </p>
                    </li>
                    <li className='admin-context-menu__item admin-context-menu__item_active'>
                        <p className='admin-context-menu-item'>
                                        <span className='admin-context-menu-item__label'>
                                            {AdminIcons.view_module}
                                            Список
                                        </span>
                            <span className='admin-context-menu-item__icon'>{AdminIcons.check}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default ContextMenu;