import React from 'react';
import {useNavigate} from "react-router-dom";

import Button from "../../../../components/admin/button/button.component";
import MenuList from "./menu.list";

import {AdminIcons} from "../../../../components/svgs";

const MenuItem = ({title, item, firstSorting, lastSorting, onUpSorting = () => {}, onDownSorting = () => {}}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    if(item)
        return (
            <li className={`admin-menu-constructor__item ${
                isOpen ? ` admin-menu-constructor__item_opened` : ``
            }`}>
                <div className='admin-menu-constructor__caption'>
                    <div className='admin-menu-constructor__caption-panel'>
                        {
                            !firstSorting
                            &&
                            <Button
                                type='button'
                                extraClass={"admin-menu-constructor__sorting-button"}
                                isIconBtn='true'
                                theme='text'
                                iconName={AdminIcons.chevron_up}
                                aria-label='Поднять на уровень вверх'
                                onClick={() => {
                                    onUpSorting(item);
                                }}
                            />
                        }
                        {
                            !lastSorting
                            &&
                            <Button
                                type='button'
                                extraClass={"admin-menu-constructor__sorting-button"}
                                isIconBtn='true'
                                theme='text'
                                iconName={AdminIcons.chevron_down}
                                aria-label='Поднять на уровень вниз'
                                onClick={() => {
                                    onDownSorting(item);
                                }}
                            />
                        }
                    </div>
                    <div className='admin-menu-constructor__caption-info'>
                        {
                            item.page === 0
                            &&
                            <Button
                                type='button'
                                extraClass={"admin-menu-constructor__button__edit"}
                                isIconBtn='true'
                                theme='text'
                                iconName={AdminIcons.plus}
                                aria-label='Добавить подменю'
                                title='Добавить подменю'
                                onClick={() => {
                                    const sorting = item.submenu[item.submenu.length - 1]?.sorting || 0;
                                    navigate(`new/${item.ID}/${sorting}`)
                                }}
                            />
                        }
                        <Button
                            type='button'
                            isIconBtn='true'
                            extraClass={"admin-menu-constructor__button__edit"}
                            theme='text'
                            iconName={AdminIcons.edit}
                            aria-label='Редактировать страницу'
                            title='Редактировать страницу'
                            onClick={() => navigate(`edit/${item.ID}`)}
                        />
                        <h2 className='admin-menu-constructor__caption-title'>{title}</h2>
                        {
                            item.submenu?.length > 0
                            &&
                            <Button
                                type='button'
                                extraClass={"admin-menu-constructor__button"}
                                isIconBtn='true'
                                theme='text'
                                iconName={isOpen ? AdminIcons.chevron_up : AdminIcons.chevron_down}
                                aria-label={isOpen ? "Свернуть" : "Развернуть"}
                                onClick={() => setIsOpen((prev) => !prev)}
                            />
                        }
                    </div>
                </div>
                {
                    item.submenu?.length > 0
                    &&
                    <div className='admin-menu-constructor__container'>
                        <ul className='admin-menu-constructor__list'>
                            <MenuList list={item.submenu} />
                        </ul>
                    </div>
                }
            </li>
        )
};

export default MenuItem;