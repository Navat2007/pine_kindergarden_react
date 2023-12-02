import React from "react";
import { useNavigate } from "react-router-dom";

import useMenuStore from "../../../store/admin/menuStore";
import {sortingToSave} from "../../../services/menu";

import MenuList from "./components/menu.list";
import Button from "../../../components/admin/button/button.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";

import { AdminIcons } from "../../../components/svgs";

const MenuPage = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [menuItems, setMenuItems] = React.useState([]);

    const navigate = useNavigate();
    const store = useMenuStore;

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadAll();
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        setMenuItems(store.items.value.sorted);
    }, [store.items.value]);

    const saveSorting = async () => {
        const toSave = [];

        sortingToSave.value.map(item => {
            return item.map(menu => {
                toSave.push({id: menu.ID, sorting: menu.sorting});
            })
        });

        await store.save({ sorting: toSave});
        setIsEditing((prev) => !prev);
    }

    const cancelSorting = async () => {
        setIsEditing((prev) => !prev);
        await store.loadAll()
    }

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Структура меню`}>
                {!isEditing ?
                    <>
                        <Button
                            type='button'
                            iconName={AdminIcons.ascending}
                            aria-label='Сортировать'
                            onClick={() => setIsEditing((prev) => !prev)}
                            style={{ paddingBlock: ".75em", marginLeft: "1.875em" }}
                        >
                            Сортировать
                        </Button>
                        <Button
                            type='button'
                            iconName={AdminIcons.plus}
                            aria-label='Добавить'
                            onClick={() => navigate("new/0/" + store.items.value.sorted[store.items.value.sorted.length - 1]?.sorting)}
                            style={{ paddingBlock: ".75em"}}
                        >
                            Добавить
                        </Button>
                    </>
                    :
                    <>
                        <Button
                            type='button'
                            aria-label='Сохранить'
                            style={{ marginLeft: "auto" }}
                            onClick={saveSorting}
                        >
                            Сохранить
                        </Button>
                        <Button
                            type='button'
                            theme={"text"}
                            aria-label='Отмена'
                            onClick={cancelSorting}
                        >
                            Отмена
                        </Button>
                    </>
                }
            </TitleBlock>
            <section className={`admin-menu-constructor ${isEditing ? ` admin-menu-constructor_mode_editing` : ``}`}>
                <ul className='admin-menu-constructor__list'>
                    <MenuList list={menuItems} />
                </ul>
            </section>
        </BasicPage>
    );
};

export default MenuPage;
