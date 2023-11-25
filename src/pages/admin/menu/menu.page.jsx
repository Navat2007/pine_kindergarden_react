import React from 'react';
import {useNavigate} from "react-router-dom";

import {userStore} from "../../../store/userStore";
import useMenuStore from "../../../store/admin/menuStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import {AdminIcons} from "../../../components/svgs";

const MenuPage = () => {
    const navigate = useNavigate();
    const store = useMenuStore();

    const url = 'admin/menu';

    const onItemClick = (props) => {
        navigate(`/${url}/${props}`);
    };

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const itemConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Название",
            key: "titleShort",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Дата",
            key: "create_time",
            type: "datetime",
            filter: "date",
            sorting: true,
        },
    ];

    return (
        <Table
            title={`Таблица ${url} ${userStore.value.ID}`}
            loading={store.loading}
            items={store.items}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        >
            <Button
                type='button'
                iconName={AdminIcons.plus}
                aria-label='Добавить меню'
                onClick={() => navigate(`/${url}/new`)}
            >
                Создать
            </Button>
        </Table>
    );
};

export default MenuPage;