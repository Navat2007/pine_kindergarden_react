import React from "react";
import { useNavigate } from "react-router-dom";

import useDocumentsStore from "../../../store/admin/documentsStore";
import {userStore} from "../../../store/userStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import { AdminIcons } from "../../../components/svgs";

const AdminDocumentsPage = () => {
    const navigate = useNavigate();
    const store = useDocumentsStore();

    const url = 'admin/documents';

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
                aria-label='Добавить документ'
                onClick={() => navigate(`/${url}/new`)}
            >
                Создать
            </Button>
        </Table>
    );
};

export default AdminDocumentsPage;
