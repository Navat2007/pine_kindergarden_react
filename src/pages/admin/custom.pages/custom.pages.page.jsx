import React from 'react';
import {useNavigate} from "react-router-dom";

import {userStore} from "../../../store/userStore";
import useCustomPagesStore from "../../../store/admin/customPagesStore";

import Table from "../../../components/admin/table/table.component";
import {Helmet} from "react-helmet";

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
            header: "Ссылка",
            key: "url",
            type: "string",
            filter: "string",
            sorting: true,
        },
    ];

    return (
        <>
            <Helmet>
                <title>{`Таблица пользовательских страниц`}</title>
            </Helmet>
            <Table
                title={`Таблица пользовательских страниц ${url} ${userStore.value.ID}`}
                loading={store.loading}
                items={store.items}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            />
        </>
    );
};

export default CustomPagesPage;