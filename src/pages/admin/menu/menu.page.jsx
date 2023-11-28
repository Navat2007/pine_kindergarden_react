import React from "react";
import { useNavigate } from "react-router-dom";

import useMenuStore from "../../../store/admin/menuStore";

import MenuList from "./components/menu.list";
import Button from "../../../components/admin/button/button.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";

import { AdminIcons } from "../../../components/svgs";

const MenuPage = () => {
    const [isEditing, setIsEditing] = React.useState(false);

    const navigate = useNavigate();
    const store = useMenuStore;

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadAll();
        };

        fetchData();
    }, []);

    const saveSorting = async () => {
        await store.save();
        setIsEditing((prev) => !prev);
    }

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Структура меню`}>
                {!isEditing ?
                    <>
                        <Button
                            type='button'
                            iconName={AdminIcons.edit}
                            aria-label='Сортировать'
                            onClick={() => setIsEditing((prev) => !prev)}
                            style={{ marginLeft: "auto" }}
                        >
                            Сортировать
                        </Button>
                        <Button
                            type='button'
                            iconName={AdminIcons.plus}
                            aria-label='Добавить'
                            onClick={() => navigate("new/0/" + store.items.value.sorted[store.items.value.sorted.length - 1]?.sorting)}
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
                            onClick={() => setIsEditing((prev) => !prev)}
                        >
                            Отмена
                        </Button>
                    </>
                }
            </TitleBlock>
            <section className={`admin-menu-constructor ${isEditing ? ` admin-menu-constructor_mode_editing` : ``}`}>
                <ul className='admin-menu-constructor__list'>
                    {
                        store.items.value?.sorted?.length > 0
                        &&
                        <MenuList list={store.items.value.sorted} />
                    }
                </ul>
            </section>
        </BasicPage>
    );
};

export default MenuPage;
