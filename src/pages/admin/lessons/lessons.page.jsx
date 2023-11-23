import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import useLessonsStore from "../../../store/admin/lessonsStore";
import {userStore} from "../../../store/userStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import { AdminIcons } from "../../../components/svgs";

const AdminLessonsPage = () => {
    const navigate = useNavigate();
    const store = useLessonsStore();

    const url = 'admin/lessons';

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
            key: "title",
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
        <>
            <Helmet>
                <title>Административный раздел. Занятия</title>
            </Helmet>
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
                    aria-label='Добавить занятие'
                    onClick={() => navigate(`/${url}/new`)}
                >
                    Создать
                </Button>
            </Table>
        </>
    );
};

export default AdminLessonsPage;
