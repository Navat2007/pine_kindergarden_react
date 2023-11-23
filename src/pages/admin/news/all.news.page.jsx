import React from "react";
import { useNavigate } from "react-router-dom";

import useNewsStore from "../../../store/admin/newsStore";
import {userStore} from "../../../store/userStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import { AdminIcons } from "../../../components/svgs";

const AdminAllNewsPage = () => {
    const navigate = useNavigate();
    const store = useNewsStore();

    const url = 'admin/news';

    const onItemClick = (props) => {
        navigate(`/${url}/${props}`);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadAll();
        };

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
            key: "preview_title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Дата",
            key: "date",
            type: "datetime",
            filter: "date",
            sorting: true,
        },
        {
            header: "Статус",
            key: "active",
            type: "string",
            filter: "select",
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
                aria-label='Добавить новость'
                onClick={() => navigate(`/${url}/new`)}
            >
                Создать
            </Button>
        </Table>
    );
};

export default AdminAllNewsPage;
