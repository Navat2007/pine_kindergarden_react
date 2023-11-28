import React from 'react';
import {useNavigate} from "react-router-dom";

import {userStore} from "../../../store/userStore";
import useCustomPagesStore from "../../../store/admin/customPagesStore";

import Table from "../../../components/admin/table/table.component";

const CustomPagesPage = () => {
    const navigate = useNavigate();
    const store = useCustomPagesStore();

    const url = "admin/customPages";

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
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Тип файла",
            key: "type",
            type: "string",
            filter: "select",
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
            title={`Таблица пользовательских страниц ${url} ${userStore.value.ID}`}
            loading={store.loading}
            items={store.items}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        />
    );
};

export default CustomPagesPage;