import React from "react";
import { useNavigate } from "react-router-dom";

import useMenuStore from "../../../store/admin/menuStore";
import { AdminIcons } from "../../../components/svgs";
import Button from "../../../components/admin/button/button.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import FieldTextComponent from "../../../components/admin/field/field.text.component";
import FieldSelectComponent from "../../../components/admin/field/field.select.component";

const MenuPage = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);

    const navigate = useNavigate();
    const store = useMenuStore();

    React.useEffect(() => {
        const fetchData = async () => {
            //await store.loadAll();
        };

        fetchData();
    }, []);

    console.log(store.items);

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Структура меню`}>
                {!isEditing && (
                    <Button
                        type='button'
                        iconName={AdminIcons.edit}
                        aria-label='Редактировать'
                        onClick={() => setIsEditing((prev) => !prev)}
                        style={{ marginLeft: "auto" }}
                    >
                        Сортировать
                    </Button>
                )}
                {isEditing && (
                    <>
                        <Button
                            type='button'
                            aria-label='Сохранить'
                            style={{ marginLeft: "auto" }}
                            onClick={() => setIsEditing((prev) => !prev)}
                        >
                            Сохранить
                        </Button>
                        <Button type='button' theme={"text"} aria-label='Отмена'>
                            Отмена
                        </Button>
                    </>
                )}
            </TitleBlock>
            <section className={`admin-menu-constructor ${isEditing ? ` admin-menu-constructor_mode_editing` : ``}`}>
                <ul className='admin-menu-constructor__list'>
                    <li className='admin-menu-constructor__item'>
                        <div className='admin-menu-constructor__caption'>
                            <div className='admin-menu-constructor__caption-panel'>
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__sorting-button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.chevron_down}
                                    aria-label='Поднять на уровень вниз'
                                />
                            </div>
                            <div className='admin-menu-constructor__caption-info'>
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.plus}
                                    aria-label='Добавить подменю'
                                    title='Добавить подменю'
                                />
                                <Button
                                    type='button'
                                    isIconBtn='true'
                                    extraClass={"admin-menu-constructor__button"}
                                    theme='text'
                                    iconName={AdminIcons.edit}
                                    aria-label='Редактировать страницу'
                                    title='Редактировать страницу'
                                />
                                <h2 className='admin-menu-constructor__caption-title'>Главная</h2>
                            </div>
                        </div>
                    </li>
                    <li className='admin-menu-constructor__item'>
                        <div className='admin-menu-constructor__caption'>
                            <div className='admin-menu-constructor__caption-panel'>
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__sorting-button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.chevron_up}
                                    aria-label='Поднять на уровень вверх'
                                />
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__sorting-button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.chevron_down}
                                    aria-label='Поднять на уровень вниз'
                                />
                            </div>
                            <div className='admin-menu-constructor__caption-info'>
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.plus}
                                    aria-label='Добавить подменю'
                                    title='Добавить подменю'
                                />
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.edit}
                                    aria-label='Редактировать страницу'
                                    title='Редактировать страницу'
                                />
                                <h2 className='admin-menu-constructor__caption-title'>Платные услуги</h2>
                            </div>
                        </div>
                    </li>
                    <li
                        className={`admin-menu-constructor__item ${
                            isOpen ? ` admin-menu-constructor__item_opened` : ``
                        }`}
                    >
                        <div className='admin-menu-constructor__caption'>
                            <div className='admin-menu-constructor__caption-panel'>
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__sorting-button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.chevron_up}
                                    aria-label='Поднять на уровень вверх'
                                />
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__sorting-button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.chevron_down}
                                    aria-label='Поднять на уровень вниз'
                                />
                            </div>
                            <div className='admin-menu-constructor__caption-info'>
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.plus}
                                    aria-label='Добавить подменю'
                                    title='Добавить подменю'
                                />
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={AdminIcons.edit}
                                    aria-label='Редактировать страницу'
                                    title='Редактировать страницу'
                                />
                                <h2 className='admin-menu-constructor__caption-title'>
                                    Сведения об образовательной организации
                                </h2>
                                <Button
                                    type='button'
                                    extraClass={"admin-menu-constructor__button"}
                                    isIconBtn='true'
                                    theme='text'
                                    iconName={isOpen ? AdminIcons.chevron_up : AdminIcons.chevron_down}
                                    aria-label={isOpen ? "Свернуть" : "Развернуть"}
                                    onClick={() => setIsOpen((prev) => !prev)}
                                />
                            </div>
                        </div>
                        <div className='admin-menu-constructor__container'>
                            <ul className='admin-menu-constructor__list'>
                                <li className='admin-menu-constructor__item'>
                                    <div className='admin-menu-constructor__caption'>
                                        <div className='admin-menu-constructor__caption-panel'>
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__sorting-button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.chevron_down}
                                                aria-label='Поднять на уровень вниз'
                                            />
                                        </div>
                                        <div className='admin-menu-constructor__caption-info'>
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.plus}
                                                aria-label='Добавить подменю'
                                                title='Добавить подменю'
                                            />
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.edit}
                                                aria-label='Редактировать страницу'
                                                title='Редактировать страницу'
                                            />
                                            <h2 className='admin-menu-constructor__caption-title'>Главная</h2>
                                        </div>
                                    </div>
                                </li>
                                <li className='admin-menu-constructor__item'>
                                    <div className='admin-menu-constructor__caption'>
                                        <div className='admin-menu-constructor__caption-panel'>
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__sorting-button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.chevron_up}
                                                aria-label='Поднять на уровень вверх'
                                            />
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__sorting-button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.chevron_down}
                                                aria-label='Поднять на уровень вниз'
                                            />
                                        </div>
                                        <div className='admin-menu-constructor__caption-info'>
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.plus}
                                                aria-label='Добавить подменю'
                                                title='Добавить подменю'
                                            />
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.edit}
                                                aria-label='Редактировать страницу'
                                                title='Редактировать страницу'
                                            />
                                            <h2 className='admin-menu-constructor__caption-title'>Платные услуги</h2>
                                        </div>
                                    </div>
                                </li>
                                <li
                                    className={`admin-menu-constructor__item ${
                                        isOpen ? ` admin-menu-constructor__item_opened` : ``
                                    }`}
                                >
                                    <div className='admin-menu-constructor__caption'>
                                        <div className='admin-menu-constructor__caption-panel'>
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__sorting-button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.chevron_up}
                                                aria-label='Поднять на уровень вверх'
                                            />
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__sorting-button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.chevron_down}
                                                aria-label='Поднять на уровень вниз'
                                            />
                                        </div>
                                        <div className='admin-menu-constructor__caption-info'>
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.plus}
                                                aria-label='Добавить подменю'
                                                title='Добавить подменю'
                                            />
                                            <Button
                                                type='button'
                                                extraClass={"admin-menu-constructor__button"}
                                                isIconBtn='true'
                                                theme='text'
                                                iconName={AdminIcons.edit}
                                                aria-label='Редактировать страницу'
                                                title='Редактировать страницу'
                                            />
                                            <h2 className='admin-menu-constructor__caption-title'>
                                                Сведения об образовательной организации
                                            </h2>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>
        </BasicPage>
    );
};

export default MenuPage;
